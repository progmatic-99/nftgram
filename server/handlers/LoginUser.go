package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type userLoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

var (
	ErrEmailNotFound = "email not found"
	ErrWrongPassword = "wrong password"
)

func (h handler) LoginUser(c *gin.Context) {
	var user userLoginRequest

	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	storedUser, userNotFound := h.GetUser(user.Email)
	if userNotFound != nil {
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

	accessToken, err := h.tokenMaker.CreateToken(storedUser.Email, h.TokenDuration)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err,
		})
	}

	// refreshToken, err := h.tokenMaker.CreateRefreshToken(storedUser.ID)
	// if err != nil {
	// 	c.JSON(http.StatusInternalServerError, gin.H{
	// 		"error": err,
	// 	})
	// }

	c.JSON(http.StatusAccepted, gin.H{
		"accessToken": accessToken,
	})
}
