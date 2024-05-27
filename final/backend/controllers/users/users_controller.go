package users

import (
	userDomain "backend/domain"
	userService "backend/services/users"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

// controllers es el unico que usa gin
func Login(c *gin.Context) {
	var loginRequest userDomain.LoginRequest

	if err := c.ShouldBindJSON(&loginRequest); err != nil {
		c.JSON(http.StatusBadRequest, userDomain.Result{
			Message: fmt.Sprintf(("Invalid request: %s"), err.Error()),
		})
	}

	token, err := userService.Login(loginRequest.Email, loginRequest.Password)
	if err != nil {
		c.JSON(http.StatusUnauthorized, userDomain.Result{
			Message: fmt.Sprintf("Unauthorized login: %s", err.Error()),
		})
		return
	}

	c.JSON(http.StatusOK, userDomain.LoginResponse{
		Token: token,
	})
}

func UserRegister(c *gin.Context) {
	var registrationRequest userDomain.RegistrationRequest

	if err := c.ShouldBindJSON(&registrationRequest); err != nil {
		c.JSON(http.StatusBadRequest, userDomain.Result{
			Message: fmt.Sprintf(("Invalid request: %s"), err.Error()),
		})
	}

	err := userService.UserRegister(registrationRequest.Nickname, registrationRequest.Email, registrationRequest.Password, registrationRequest.Type)
	if err != nil {
		c.JSON(http.StatusUnauthorized, userDomain.Result{
			Message: fmt.Sprintf("Unauthorized login: %s", err.Error()),
		})
		return
	}

	c.JSON(http.StatusOK, userDomain.Result{
		Message: fmt.Sprintf("Successful creation of user %s ", registrationRequest.Nickname),
	})
}
