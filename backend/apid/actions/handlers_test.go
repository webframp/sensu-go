package actions

import (
	"context"
	"errors"
	"testing"

	"github.com/sensu/sensu-go/testing/mockstore"
	"github.com/sensu/sensu-go/testing/testutil"
	"github.com/sensu/sensu-go/types"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestNewHandlerController(t *testing.T) {
	assert := assert.New(t)

	store := &mockstore.Store{}
	ctl := NewHandlerController(store)
	assert.NotNil(ctl)
	assert.Equal(store, ctl.Store)
	assert.NotNil(ctl.Policy)
}

func TestHandlerCreate(t *testing.T) {
	defaultCtx := testutil.NewContext(
		testutil.ContextWithOrgEnv("default", "default"),
		testutil.ContextWithRules(
			types.FixtureRuleWithPerms(types.RuleTypeHandler, types.RulePermCreate),
		),
	)
	wrongPermsCtx := testutil.NewContext(
		testutil.ContextWithOrgEnv("default", "default"),
		testutil.ContextWithRules(
			types.FixtureRuleWithPerms(types.RuleTypeHandler, types.RulePermRead),
		),
	)

	badHandler := types.FixtureHandler("bad")
	badHandler.Name = "!@#!#$@#^$%&$%&$&$%&%^*%&(%@###"

	tests := []struct {
		name            string
		ctx             context.Context
		argument        *types.Handler
		fetchResult     *types.Handler
		fetchErr        error
		createErr       error
		expectedErr     bool
		expectedErrCode ErrCode
	}{
		{
			name:        "Created",
			ctx:         defaultCtx,
			argument:    types.FixtureHandler("foo"),
			expectedErr: false,
		},
		{
			name:            "Already Exists",
			ctx:             defaultCtx,
			argument:        types.FixtureHandler("foo"),
			fetchResult:     types.FixtureHandler("foo"),
			expectedErr:     true,
			expectedErrCode: AlreadyExistsErr,
		},
		{
			name:            "Store Err on Fetch",
			ctx:             defaultCtx,
			argument:        types.FixtureHandler("foo"),
			fetchErr:        errors.New("nein"),
			expectedErr:     true,
			expectedErrCode: InternalErr,
		},
		{
			name:            "No Permission",
			ctx:             wrongPermsCtx,
			argument:        types.FixtureHandler("foo"),
			expectedErr:     true,
			expectedErrCode: PermissionDenied,
		},
		{
			name:            "Validation Error",
			ctx:             defaultCtx,
			argument:        badHandler,
			expectedErr:     true,
			expectedErrCode: InvalidArgument,
		},
	}

	for _, test := range tests {
		store := &mockstore.Store{}
		ctl := NewHandlerController(store)

		t.Run(test.name, func(t *testing.T) {
			assert := assert.New(t)

			store.On("GetHandlerByName", mock.Anything, mock.Anything).
				Return(test.fetchResult, test.fetchErr)

			store.On("UpdateHandler", mock.Anything, mock.Anything).Return(test.createErr)

			err := ctl.Create(test.ctx, *test.argument)

			if test.expectedErr {
				if cerr, ok := err.(Error); ok {
					assert.Equal(test.expectedErrCode, cerr.Code)
				} else {
					assert.Error(err)
					assert.FailNow("Not of type 'Error'")
				}
			} else {
				assert.NoError(err)
			}
		})
	}
}

func TestHandlerCreateOrReplace(t *testing.T) {
	defaultCtx := testutil.NewContext(
		testutil.ContextWithOrgEnv("default", "default"),
		testutil.ContextWithRules(
			types.FixtureRuleWithPerms(
				types.RuleTypeHandler,
				types.RulePermCreate,
				types.RulePermUpdate,
			),
		),
	)
	wrongPermsCtx := testutil.NewContext(
		testutil.ContextWithOrgEnv("default", "default"),
		testutil.ContextWithRules(
			types.FixtureRuleWithPerms(types.RuleTypeHandler, types.RulePermCreate),
		),
	)

	badHandler := types.FixtureHandler("bad")
	badHandler.Name = "!@#!#$@#^$%&$%&$&$%&%^*%&(%@###"

	tests := []struct {
		name            string
		ctx             context.Context
		argument        *types.Handler
		fetchResult     *types.Handler
		fetchErr        error
		createErr       error
		expectedErr     bool
		expectedErrCode ErrCode
	}{
		{
			name:        "Created",
			ctx:         defaultCtx,
			argument:    types.FixtureHandler("foo"),
			expectedErr: false,
		},
		{
			name:        "Already Exists",
			ctx:         defaultCtx,
			argument:    types.FixtureHandler("foo"),
			fetchResult: types.FixtureHandler("foo"),
		},
		{
			name:            "No Permission",
			ctx:             wrongPermsCtx,
			argument:        types.FixtureHandler("foo"),
			expectedErr:     true,
			expectedErrCode: PermissionDenied,
		},
		{
			name:            "Validation Error",
			ctx:             defaultCtx,
			argument:        badHandler,
			expectedErr:     true,
			expectedErrCode: InvalidArgument,
		},
	}

	for _, test := range tests {
		store := &mockstore.Store{}
		ctl := NewHandlerController(store)

		t.Run(test.name, func(t *testing.T) {
			assert := assert.New(t)

			store.On("GetHandlerByName", mock.Anything, mock.Anything).
				Return(test.fetchResult, test.fetchErr)

			store.On("UpdateHandler", mock.Anything, mock.Anything).Return(test.createErr)

			err := ctl.CreateOrReplace(test.ctx, *test.argument)

			if test.expectedErr {
				if cerr, ok := err.(Error); ok {
					assert.Equal(test.expectedErrCode, cerr.Code)
				} else {
					assert.Error(err)
					assert.FailNow("Not of type 'Error'")
				}
			} else {
				assert.NoError(err)
			}
		})
	}
}

func TestHandlerDestroy(t *testing.T) {
	defaultCtx := testutil.NewContext(
		testutil.ContextWithOrgEnv("default", "default"),
		testutil.ContextWithRules(
			types.FixtureRuleWithPerms(types.RuleTypeHandler, types.RulePermDelete),
		),
	)
	wrongPermsCtx := testutil.NewContext(
		testutil.ContextWithOrgEnv("default", "default"),
		testutil.ContextWithRules(
			types.FixtureRuleWithPerms(types.RuleTypeHandler, types.RulePermCreate),
		),
	)

	testCases := []struct {
		name            string
		ctx             context.Context
		argument        string
		fetchResult     *types.Handler
		fetchErr        error
		deleteErr       error
		expectedErr     bool
		expectedErrCode ErrCode
	}{
		{
			name:        "deleted",
			ctx:         defaultCtx,
			argument:    "handler1",
			fetchResult: types.FixtureHandler("handler1"),
			expectedErr: false,
		},
		{
			name:            "does not exist",
			ctx:             defaultCtx,
			argument:        "handler1",
			fetchResult:     nil,
			expectedErr:     true,
			expectedErrCode: NotFound,
		},
		{
			name:            "store err on delete",
			ctx:             defaultCtx,
			argument:        "handler1",
			fetchResult:     types.FixtureHandler("handler1"),
			deleteErr:       errors.New("dunno"),
			expectedErr:     true,
			expectedErrCode: InternalErr,
		},
		{
			name:            "store err on fetch",
			ctx:             defaultCtx,
			argument:        "handler1",
			fetchResult:     types.FixtureHandler("handler1"),
			fetchErr:        errors.New("dunno"),
			expectedErr:     true,
			expectedErrCode: InternalErr,
		},
		{
			name:            "no permission",
			ctx:             wrongPermsCtx,
			argument:        "handler1",
			fetchResult:     types.FixtureHandler("handler1"),
			expectedErr:     true,
			expectedErrCode: PermissionDenied,
		},
	}

	for _, tc := range testCases {
		store := &mockstore.Store{}
		actions := NewHandlerController(store)

		t.Run(tc.name, func(t *testing.T) {
			assert := assert.New(t)

			// Mock store methods
			store.
				On("GetHandlerByName", mock.Anything, mock.Anything).
				Return(tc.fetchResult, tc.fetchErr)
			store.
				On("DeleteHandlerByName", mock.Anything, "handler1").
				Return(tc.deleteErr)

			// Exec Query
			err := actions.Destroy(tc.ctx, tc.argument)

			if tc.expectedErr {
				inferErr, ok := err.(Error)
				if ok {
					assert.Equal(tc.expectedErrCode, inferErr.Code)
				} else {
					assert.Error(err)
					assert.FailNow("Given was not of type 'Error'")
				}
			} else {
				assert.NoError(err)
			}
		})
	}
}

func TestHandlerFind(t *testing.T) {
	readCtx := testutil.NewContext(testutil.ContextWithRules(
		types.FixtureRuleWithPerms(types.RuleTypeHandler, types.RulePermRead),
	))

	tests := []struct {
		name            string
		ctx             context.Context
		handler         *types.Handler
		argument        string
		expected        bool
		expectedErrCode ErrCode
	}{
		{
			name:            "no argument given",
			ctx:             readCtx,
			argument:        "",
			expected:        false,
			expectedErrCode: NotFound,
		},
		{
			name:            "found",
			ctx:             readCtx,
			handler:         types.FixtureHandler("foo"),
			argument:        "foo",
			expected:        true,
			expectedErrCode: 0,
		},
		{
			name:            "not found",
			ctx:             readCtx,
			handler:         nil,
			argument:        "missing",
			expected:        false,
			expectedErrCode: NotFound,
		},
		{
			name: "no read permission",
			ctx: testutil.NewContext(testutil.ContextWithRules(
				types.FixtureRuleWithPerms(types.RuleTypeHandler, types.RulePermCreate),
			)),
			handler:         types.FixtureHandler("foo"),
			argument:        "foo",
			expected:        false,
			expectedErrCode: NotFound,
		},
	}

	for _, test := range tests {
		t.Run(test.name, func(t *testing.T) {
			store := &mockstore.Store{}
			ctl := NewHandlerController(store)

			// Mock store methods
			store.On("GetHandlerByName", test.ctx, test.argument).
				Return(test.handler, nil)

			assert := assert.New(t)
			result, err := ctl.Find(test.ctx, test.argument)
			if cerr, ok := err.(Error); ok {
				assert.Equal(test.expectedErrCode, cerr.Code)
			} else {
				assert.NoError(err)
			}
			assert.Equal(test.expected, result != nil, "expects Find() to return an event")
		})
	}
}

func TestHandlerQuery(t *testing.T) {
	readCtx := testutil.NewContext(testutil.ContextWithRules(
		types.FixtureRuleWithPerms(types.RuleTypeHandler, types.RulePermRead)))

	tests := []struct {
		name        string
		ctx         context.Context
		handlers    []*types.Handler
		expectedLen int
		storeErr    error
		expectedErr error
	}{
		{
			name:        "no params, no handlers",
			ctx:         readCtx,
			handlers:    nil,
			expectedLen: 0,
			storeErr:    nil,
			expectedErr: nil,
		},
		{
			name: "no params with handlers",
			ctx:  readCtx,
			handlers: []*types.Handler{
				types.FixtureHandler("foo"),
				types.FixtureHandler("bar"),
			},
			expectedLen: 2,
			storeErr:    nil,
			expectedErr: nil,
		},
		{
			name: "no params with only create access",
			ctx: testutil.NewContext(testutil.ContextWithRules(
				types.FixtureRuleWithPerms(types.RuleTypeHandler, types.RulePermCreate),
			)),
			handlers: []*types.Handler{
				types.FixtureHandler("foo"),
				types.FixtureHandler("bar"),
			},
			expectedLen: 0,
			storeErr:    nil,
			expectedErr: nil,
		},
		{
			name: "handler name param",
			ctx:  readCtx,
			handlers: []*types.Handler{
				types.FixtureHandler("foo"),
			},
			expectedLen: 1,
			storeErr:    nil,
			expectedErr: nil,
		},
		{
			name:        "store failure",
			ctx:         readCtx,
			handlers:    nil,
			expectedLen: 0,
			storeErr:    errors.New(""),
			expectedErr: NewError(InternalErr, errors.New("")),
		},
	}

	for _, test := range tests {
		store := &mockstore.Store{}
		ctl := NewHandlerController(store)

		t.Run(test.name, func(t *testing.T) {
			assert := assert.New(t)

			// Mock store methods
			store.On("GetHandlers", test.ctx).Return(test.handlers, test.storeErr)

			results, err := ctl.Query(test.ctx)

			assert.EqualValues(test.expectedErr, err)
			assert.Len(results, test.expectedLen)
		})
	}
}

func TestHandlerUpdate(t *testing.T) {
	defaultCtx := testutil.NewContext(
		testutil.ContextWithOrgEnv("default", "default"),
		testutil.ContextWithRules(
			types.FixtureRuleWithPerms(types.RuleTypeHandler, types.RulePermUpdate),
		),
	)
	wrongPermsCtx := testutil.NewContext(
		testutil.ContextWithOrgEnv("default", "default"),
		testutil.ContextWithRules(
			types.FixtureRuleWithPerms(types.RuleTypeHandler, types.RulePermRead),
		),
	)

	badHandler := types.FixtureHandler("handler1")
	badHandler.Type = ""

	testCases := []struct {
		name            string
		ctx             context.Context
		argument        *types.Handler
		fetchResult     *types.Handler
		fetchErr        error
		updateErr       error
		expectedErr     bool
		expectedErrCode ErrCode
	}{
		{
			name:        "updated",
			ctx:         defaultCtx,
			argument:    types.FixtureHandler("handler2"),
			fetchResult: types.FixtureHandler("handler2"),
			expectedErr: false,
		},
		{
			name:            "does not exist",
			ctx:             defaultCtx,
			argument:        types.FixtureHandler("handler2"),
			fetchResult:     nil,
			expectedErr:     true,
			expectedErrCode: NotFound,
		},
		{
			name:            "store err on update",
			ctx:             defaultCtx,
			argument:        types.FixtureHandler("handler2"),
			fetchResult:     types.FixtureHandler("handler2"),
			updateErr:       errors.New("dunno"),
			expectedErr:     true,
			expectedErrCode: InternalErr,
		},
		{
			name:            "store err on fetch",
			ctx:             defaultCtx,
			argument:        types.FixtureHandler("handler2"),
			fetchResult:     types.FixtureHandler("handler2"),
			fetchErr:        errors.New("dunno"),
			expectedErr:     true,
			expectedErrCode: InternalErr,
		},
		{
			name:            "no permission",
			ctx:             wrongPermsCtx,
			argument:        types.FixtureHandler("handler2"),
			fetchResult:     types.FixtureHandler("handler2"),
			expectedErr:     true,
			expectedErrCode: PermissionDenied,
		},
		{
			name:            "validation error",
			ctx:             defaultCtx,
			argument:        badHandler,
			fetchResult:     types.FixtureHandler("handler1"),
			expectedErr:     true,
			expectedErrCode: InvalidArgument,
		},
	}

	for _, tc := range testCases {
		store := &mockstore.Store{}
		actions := NewHandlerController(store)

		t.Run(tc.name, func(t *testing.T) {
			assert := assert.New(t)

			// Mock store methods
			store.
				On("GetHandlerByName", mock.Anything, mock.Anything).
				Return(tc.fetchResult, tc.fetchErr)
			store.
				On("UpdateHandler", mock.Anything, mock.Anything).
				Return(tc.updateErr)

			// Exec Query
			err := actions.Update(tc.ctx, *tc.argument)

			if tc.expectedErr {
				inferErr, ok := err.(Error)
				if ok {
					assert.Equal(tc.expectedErrCode, inferErr.Code)
				} else {
					assert.Error(err)
					assert.FailNow("Given was not of type 'Error'")
				}
			} else {
				assert.NoError(err)
			}
		})
	}
}
