package handlers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/progmatic-99/nftgram/server/models"
	"golang.org/x/crypto/bcrypt"
)

func (h handler) LoginUser(c *gin.Context) {
	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {
		log.Println(err)

		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	var storedUser models.User

	if err := h.DB.Select("email").First(&storedUser, "email = ?", string(user.Email)).Error; err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Email not found.",
		})

		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(storedUser.Password), []byte(user.Password)); err != nil {
		log.Println(err)
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Wrong password!!",
		})

		return
	}

	c.JSON(http.StatusAccepted, gin.H{
		"message": "Login successfull!!",
	})
}
