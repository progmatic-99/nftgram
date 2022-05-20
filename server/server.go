package main

import (
	"log"

	"github.com/gin-contrib/cors"
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
	// corsConfig := cors.DefaultConfig()
	// corsConfig.AllowOrigins = []string{"http://127.0.0.1"}

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Origin", "Authorization", "Accept", "Content-Type"},
		AllowCredentials: true,
	}))

	r.POST("/api/signup", h.CreateUser)
	r.POST("/api/login", h.LoginUser)

	authRouter := r.Group("/").Use(authMiddleware(tokenMaker))
	authRouter.POST("/api/like", h.LikePost)
	authRouter.GET("/api/like", h.GetLikePosts)

	// Start the server on 8080
	r.Run()
}
