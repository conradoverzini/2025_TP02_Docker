package main

import (
	"backend/app"

	"backend/clients"

	"github.com/gin-gonic/gin"
)

func main() {
	clients.StartDB()

	engine := gin.New()
	app.MapRoutes(engine)
	engine.Run(":8080")
}
