package users

import (
	userDomain "backend/domain/users"
	userService "backend/services/users"
	"net/http"

	"github.com/gin-gonic/gin"
)

// controllers es el unico que usa gin
func Login(c *gin.Context) {
	var userData userDomain.UserData
	c.BindJSON(&userData)
	loginResponse := userService.Login(userData.User, userData.Password)
	c.JSON(http.StatusOK, loginResponse)
}
