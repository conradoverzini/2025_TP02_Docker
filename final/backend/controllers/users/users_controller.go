package users

import (
	userDomain "backend/domain"
	userService "backend/services/users"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

// controllers es el unico que usa gin
func Login(c *gin.Context) {
	var loginRequest userDomain.LoginRequest

	if err := c.ShouldBindJSON(&loginRequest); err != nil {
		c.JSON(http.StatusBadRequest, userDomain.Result{
			Message: fmt.Sprintf(("Invalid request: %s"), err.Error()),
		})
		return
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
		return
	}

	err := userService.UserRegister(registrationRequest.Nickname, registrationRequest.Email, registrationRequest.Password, registrationRequest.Type)
	if err != nil {
		c.JSON(http.StatusConflict, userDomain.Result{
			Message: fmt.Sprintf("Error in registration: %s", err.Error()),
		})
		return
	}

	c.JSON(http.StatusOK, userDomain.Result{
		Message: fmt.Sprintf("Successful creation of user %s ", registrationRequest.Nickname),
	})
}

func SubscriptionList(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, userDomain.Result{
			Message: fmt.Sprintf("invalid id: %s", err.Error()),
		})

		return
	}

	results, err := userService.SubscriptionList(id)
	if err != nil {
		c.JSON(http.StatusNotFound, userDomain.Result{
			Message: fmt.Sprintf("error in getting courses: %s", err.Error()),
		})
		return
	}

	c.JSON(http.StatusOK, userDomain.ListResponse{
		Result: results,
	})

}
