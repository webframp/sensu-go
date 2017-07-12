package check

import (
	"errors"
	"testing"

	client "github.com/sensu/sensu-go/cli/client/testing"
	test "github.com/sensu/sensu-go/cli/commands/testing"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
)

func TestCreateCommand(t *testing.T) {
	assert := assert.New(t)

	cli := test.NewMockCLI()
	cmd := CreateCommand(cli)

	assert.NotNil(cmd, "cmd should be returned")
	assert.NotNil(cmd.RunE, "cmd should be able to be executed")
	assert.Regexp("create", cmd.Use)
	assert.Regexp("checks", cmd.Short)
}

func TestCreateCommandRunEClosureWithoutFlags(t *testing.T) {
	assert := assert.New(t)

	cli := test.NewMockCLI()
	cmd := CreateCommand(cli)
	cmd.Flags().Set("interval", "sdfsa")
	out, err := test.RunCmd(cmd, []string{"echo 'heyhey'"})

	assert.Empty(out)
	assert.NotNil(err)
}

func TestCreateCommandRunEClosureWithAllFlags(t *testing.T) {
	assert := assert.New(t)

	cli := test.NewMockCLI()
	client := cli.Client.(*client.MockClient)
	client.On("CreateCheck", mock.AnythingOfType("*types.CheckConfig")).Return(nil)

	cmd := CreateCommand(cli)
	cmd.Flags().Set("command", "echo 'heyhey'")
	out, err := test.RunCmd(cmd, []string{"can-holla"})

	assert.Regexp("OK", out)
	assert.Nil(err)
}

func TestCreateCommandRunEClosureWithDeps(t *testing.T) {
	assert := assert.New(t)

	cli := test.NewMockCLI()
	client := cli.Client.(*client.MockClient)
	client.On("CreateCheck", mock.AnythingOfType("*types.CheckConfig")).Return(nil)

	cmd := CreateCommand(cli)
	cmd.Flags().Set("command", "echo 'heyhey'")
	cmd.Flags().Set("runtime-assets", "ruby22")
	out, err := test.RunCmd(cmd, []string{"can-holla"})

	assert.Regexp("OK", out)
	assert.Nil(err)
}

func TestCreateCommandRunEClosureWithServerErr(t *testing.T) {
	assert := assert.New(t)

	cli := test.NewMockCLI()
	client := cli.Client.(*client.MockClient)
	client.On("CreateCheck", mock.AnythingOfType("*types.CheckConfig")).Return(errors.New("whoops"))

	cmd := CreateCommand(cli)
	cmd.Flags().Set("command", "echo 'heyhey'")
	out, err := test.RunCmd(cmd, []string{"can-holla"})

	assert.Empty(out)
	assert.NotNil(err)
	assert.Equal("whoops", err.Error())
}