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
	engine.GET("/courses/search", courses.SearchCourse)
	engine.GET("/courses", courses.GetAllCourses)
	engine.GET("/courses/:id", courses.GetCourse)
	engine.POST("/subscriptions", courses.Subscription)
	engine.POST("/courses/create", courses.CreateCourse)
	engine.PUT("/courses/update/:id", courses.UpdateCorse)
	engine.DELETE("/courses/delete/:id", courses.DeleteCourse)
	engine.GET("/users/subscriptions/:id", users.SubscriptionList)
}
