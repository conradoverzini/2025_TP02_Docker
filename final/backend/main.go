package main

import (
	"backend/app"
	"net/http"

	"backend/clients"

	"github.com/gin-gonic/gin"
)

func main() {
	clients.StartDB()
	engine := gin.New()

	engine.Use(func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE, UPDATE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, X-Auth-Token")
		c.Writer.Header().Set("Access-Control-Expose-Headers", "Content-Length")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusOK)
			return
		}
		c.Next()
	})
	app.MapRoutes(engine)
	engine.Run(":8080")
}
