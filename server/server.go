package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/progmatic-99/nftgram/server/db"
	"github.com/progmatic-99/nftgram/server/handlers"
)

func main() {
	DB := db.Init()
	h := handlers.New(DB)

	r := gin.New()
	r.GET("/hello", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello world!!",
		})
		log.Println("/hello hit!!")
	})
	r.POST("/api/signup", h.CreateUser)
	r.POST("/api/login", h.LoginUser)

	// Start the server on 8080
	r.Run()
}
