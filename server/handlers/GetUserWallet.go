package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/progmatic-99/nftgram/server/models"
	"github.com/progmatic-99/nftgram/server/token"
)

func (h handler) GetUserWallet(c *gin.Context) {
	payload, exists := c.Get("payload")
	if !exists {
		return
	}

	user, err := h.GetUser(payload.(*token.Payload).Email)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusNotFound, gin.H{
			"error": err.Error(),
		})

		return
	}

	var wallet models.Wallet
	err = h.DB.Model(&user).Association("Wallets").Find(&wallet)
	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusFound, gin.H{
		"wallet": wallet,
	})
}
