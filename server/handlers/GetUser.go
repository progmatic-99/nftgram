package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/progmatic-99/nftgram/server/models"
	"github.com/progmatic-99/nftgram/server/token"
)

func (h handler) GetUser(c *gin.Context) {
	payload := c.MustGet("payload").(*token.Payload)

	var user models.User

	if err := h.DB.First(&user, "id = ?", payload.ID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "User not found.",
		})

		return
	}

	c.JSON(http.StatusFound, gin.H{
		"email":      user.Email,
		"metamaskId": user.MetamaskID,
		"phantomId":  user.PhantomID,
	})
}
