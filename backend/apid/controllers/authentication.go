package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/sensu/sensu-go/backend/authentication/jwt"
	"github.com/sensu/sensu-go/backend/store"
	"github.com/sensu/sensu-go/types"
)

// AuthenticationController handles authentication related requests
type AuthenticationController struct {
	Store store.Store
}

// Register the EventsController with a mux.Router.
func (a *AuthenticationController) Register(r *mux.Router) {
	r.HandleFunc("/auth", a.login).Methods(http.MethodGet)
	r.HandleFunc("/auth/token", a.token).Methods(http.MethodPost)
	r.HandleFunc("/auth/logout", a.logout).Methods(http.MethodPost)
}

// login handles the login flow
func (a *AuthenticationController) login(w http.ResponseWriter, r *http.Request) {
	// Check for credentials provided in the Authorization header
	username, password, ok := r.BasicAuth()
	if !ok {
		http.Error(w, "Request unauthorized", http.StatusUnauthorized)
		return
	}

	// Authenticate against the provider
	user, err := a.Store.AuthenticateUser(username, password)
	if err != nil {
		logger.WithField(
			"user", username,
		).Errorf("invalid username and/or password: %s", err.Error())
		http.Error(w, "Request unauthorized", http.StatusUnauthorized)
		return
	}

	// Create the token and a signed version
	token, tokenString, err := jwt.AccessToken(user.Username)
	if err != nil {
		err = fmt.Errorf("could not issue an access token: %s", err.Error())
		logger.WithField("user", username).Error(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Retrieve the claims because we later need the expiration
	claims, err := jwt.GetClaims(token)
	if err != nil {
		err = fmt.Errorf("could not get the access token claims: %s", err.Error())
		logger.WithField("user", username).Error(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	refreshToken, refreshTokenString, err := jwt.RefreshToken(user.Username)
	if err != nil {
		err = fmt.Errorf("could not issue a refresh token: %s", err.Error())
		logger.WithField("user", username).Error(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	refreshClaims, err := jwt.GetClaims(refreshToken)
	if err != nil {
		err = fmt.Errorf("could not get the refresh token claims: %s", err.Error())
		logger.WithField("user", username).Error(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Store the access and refresh tokens in the whitelist
	if err = a.Store.CreateToken(claims); err != nil {
		err = fmt.Errorf("could not add the access token to the whitelist: %s", err.Error())
		logger.WithField("user", username).Error(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if err = a.Store.CreateToken(refreshClaims); err != nil {
		err = fmt.Errorf("could not add the refresh token to the whitelist: %s", err.Error())
		logger.WithField("user", username).Error(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Prepare the response body
	response := &types.Tokens{
		Access:    tokenString,
		ExpiresAt: claims.ExpiresAt,
		Refresh:   refreshTokenString,
	}

	resBytes, err := json.Marshal(response)
	if err != nil {
		err = fmt.Errorf("could not not marshal response: %s", err.Error())
		logger.WithField("user", username).Error(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, string(resBytes))
}

// logout handles the logout flow
func (a *AuthenticationController) logout(w http.ResponseWriter, r *http.Request) {
	var accessClaims, refreshClaims *types.Claims

	// Get the access token claims
	if value := r.Context().Value(types.AccessTokenClaims); value != nil {
		accessClaims = value.(*types.Claims)
	} else {
		http.Error(w, "could not retrieve the access token claims", http.StatusBadRequest)
		return
	}

	// Get the refresh token claims
	if value := r.Context().Value(types.RefreshTokenClaims); value != nil {
		refreshClaims = value.(*types.Claims)
	} else {
		http.Error(w, "could not retrieve the refresh token claims", http.StatusBadRequest)
		return
	}

	// Remove the access & refresh tokens from the whitelist
	tokensToRemove := []string{accessClaims.Id, refreshClaims.Id}
	if err := a.Store.DeleteTokens(refreshClaims.Subject, tokensToRemove); err != nil {
		err = fmt.Errorf("could not remove the access and refresh tokens from the whitelist: %s", err.Error())
		logger.WithField("user", refreshClaims.Subject).Error(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	return
}

// token handles logic for issuing new access tokens
func (a *AuthenticationController) token(w http.ResponseWriter, r *http.Request) {
	var accessClaims, refreshClaims *types.Claims

	// Get the access token claims
	if value := r.Context().Value(types.AccessTokenClaims); value != nil {
		accessClaims = value.(*types.Claims)
	} else {
		http.Error(w, "could not retrieve the access token claims", http.StatusBadRequest)
		return
	}

	// Get the refresh token claims
	if value := r.Context().Value(types.RefreshTokenClaims); value != nil {
		refreshClaims = value.(*types.Claims)
	} else {
		http.Error(w, "could not retrieve the refresh token claims", http.StatusBadRequest)
		return
	}

	// Get the refresh token string
	var refreshString string
	if value := r.Context().Value(types.RefreshTokenString); value != nil {
		refreshString = value.(string)
	} else {
		http.Error(w, "could not retrieve the refresh token string", http.StatusBadRequest)
		return
	}

	// Make sure the refresh token is whitelisted
	if _, err := a.Store.GetToken(refreshClaims.Subject, refreshClaims.Id); err != nil {
		err = fmt.Errorf("the refresh token is not whitelisted: %s", err.Error())
		logger.WithField("user", refreshClaims.Subject).Error(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Remove the old access token from the whitelist
	if err := a.Store.DeleteTokens(accessClaims.Subject, []string{accessClaims.Id}); err != nil {
		// Only log the error, the access token could already have been pruned
		err = fmt.Errorf("could not remove the access token from the whitelist: %s", err.Error())
		logger.WithField("user", refreshClaims.Subject).Error(err)
	}

	// Issue a new access token
	accessToken, accessTokenString, err := jwt.AccessToken(refreshClaims.Subject)
	if err != nil {
		err = fmt.Errorf("could not issue a new access token: %s", err.Error())
		logger.WithField("user", refreshClaims.Subject).Error(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Retrieve the claims because we later need the expiration
	accessClaims, err = jwt.GetClaims(accessToken)
	if err != nil {
		err = fmt.Errorf("could not issue a new access token: %s", err.Error())
		logger.WithField("user", refreshClaims.Subject).Error(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Store the new access token in the whitelist
	if err = a.Store.CreateToken(accessClaims); err != nil {
		err = fmt.Errorf("could not add the new access token to the whitelist: %s", err.Error())
		logger.WithField("user", refreshClaims.Subject).Error(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Prepare the response body
	response := &types.Tokens{
		Access:    accessTokenString,
		ExpiresAt: accessClaims.ExpiresAt,
		Refresh:   refreshString,
	}

	resBytes, err := json.Marshal(response)
	if err != nil {
		err = fmt.Errorf("could not not marshal response: %s", err.Error())
		logger.WithField("user", refreshClaims.Subject).Error(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintf(w, string(resBytes))
}
