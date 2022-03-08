package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/progmatic-99/nftgram/server/db"
	"github.com/progmatic-99/nftgram/server/handlers"
	"github.com/progmatic-99/nftgram/server/token"
	"github.com/progmatic-99/nftgram/server/util"
)

func main() {
	config, err := util.LoadConfig(".")
	if err != nil {
		log.Fatalln("cannot load config", err)
	}

	DB := db.Init(config.DBUrl)

	tokenMaker, err := token.NewJWTMaker(config.SecretKey)
	if err != nil {
		log.Fatalln("cannot create token maker: ", err)
	}

	h := handlers.New(DB, tokenMaker, config.TokenDuration)

	r := gin.Default()
	r.GET("/hello", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Hello world!!",
		})
		log.Println("/hello hit!!")
	})
	r.POST("/api/signup", h.CreateUser)
	r.POST("/api/login", h.LoginUser)

	authRouter := r.Group("/").Use(authMiddleware(tokenMaker))

	authRouter.GET("/api/user", h.GetUser)

	// Start the server on 8080
	r.Run()
}
