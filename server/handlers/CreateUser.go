package handlers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/progmatic-99/nftgram/server/models"
)

func (h handler) CreateUser(c *gin.Context) {
	var user models.User
	if err := c.BindJSON(&user); err != nil {
		log.Fatalln(err)
	}

	if err := h.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "Params missing!",
		})

		log.Fatalln(err)
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "User created!!",
		"nonce":   user.ID,
	})
	log.Println("User created successfully!")
}
