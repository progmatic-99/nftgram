package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/progmatic-99/nftgram/server/models"
	"golang.org/x/crypto/bcrypt"
)

func (h handler) CreateUser(c *gin.Context) {
	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	hashPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 8)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "Try again!!",
		})

		return
	}

	user.Password = string(hashPassword)

	if err := h.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Email already exists!! Try with a different mail!",
		})

		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "User created!!",
	})
}
