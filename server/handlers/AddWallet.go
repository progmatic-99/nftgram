package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/progmatic-99/nftgram/server/models"
	"github.com/progmatic-99/nftgram/server/token"
)

func (h handler) AddWallet(c *gin.Context) {
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
	if err := c.ShouldBindJSON(&wallet); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})

		return
	}

	err = h.DB.Model(&models.Wallet{}).Create(map[string]interface{}{
		"Opensea": wallet.Opensea,
		"Rarible": wallet.Rarible,
		"UserID":  user.ID,
	}).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"msg": "Wallet added successfully!!",
	})
}
