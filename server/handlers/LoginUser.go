package handlers

import (
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/progmatic-99/nftgram/server/models"
	"golang.org/x/crypto/bcrypt"
)

var (
	ErrEmailNotFound = "email not found"
	ErrWrongPassword = "wrong password"
)

func (h handler) LoginUser(c *gin.Context) {
	var user models.User

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	var storedUser models.User

	if err := h.DB.First(&storedUser, "email = ?", string(user.Email)).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": ErrEmailNotFound,
		})

		return
	}

	if err := bcrypt.CompareHashAndPassword([]byte(storedUser.Password), []byte(user.Password)); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": ErrWrongPassword,
		})

		return
	}

	accessToken, err := h.tokenMaker.CreateToken(storedUser.ID, storedUser.Email, 2*time.Hour)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err,
		})
	}

	c.JSON(http.StatusAccepted, gin.H{
		"access-token": accessToken,
		"user":         storedUser,
	})
}
