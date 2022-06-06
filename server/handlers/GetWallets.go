package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/progmatic-99/nftgram/server/models"
)

var MAX_LIMIT = 1

func (h handler) GetWallets(c *gin.Context) {
	var wallets []models.Wallet

	h.DB.Limit(MAX_LIMIT).Find(&wallets)

	c.JSON(http.StatusFound, gin.H{
		"wallets": wallets,
	})
}
