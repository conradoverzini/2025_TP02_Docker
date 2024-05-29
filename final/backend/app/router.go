package app

import (
	"backend/controllers/courses"
	"backend/controllers/users"

	"github.com/gin-gonic/gin"
)

func MapRoutes(engine *gin.Engine) {
	//funcion que levanta toda la aplicacion
	engine.POST("/users/login", users.Login) //primer parametro la url y como segundo la funcion del controlador
	engine.POST("/users/register", users.UserRegister)
	engine.POST("/courses/search", courses.Search)
	engine.GET("/courses/:id", courses.Get)
	engine.POST("/subscriptions", courses.Subscription)
	engine.PUT("/users/update/:id")
	engine.POST("/courses/create")
	engine.PUT("/courses/update/:id")
	engine.DELETE("/courses/delete/:id")
	//actualizar usuario
	//crear curso
	//actualizar curso
	//borrar curso

}
