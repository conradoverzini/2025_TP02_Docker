package main

import (
	"backend/app"

	"backend/clients"

	"github.com/gin-gonic/gin"
)

func main() {
	clients.StartDB()
	engine := gin.New()

	engine.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, X-Auth-Token")
		c.Writer.Header().Set("Access-Control-Expose-Headers", "Content-Length")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Next()
	})

	app.MapRoutes(engine)
	engine.Run(":8080")
}
