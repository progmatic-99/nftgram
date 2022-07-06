package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/progmatic-99/nftgram/server/models"
	"github.com/progmatic-99/nftgram/server/token"
)

func (h handler) GetNotifications(c *gin.Context) {
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

	var notifs []models.Notification
	err = h.DB.Where("owner <> ?", user.Wallets.Opensea).Find(&notifs).Error

	if err != nil {
		c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})

		return
	}

	c.JSON(http.StatusFound, gin.H{
		"notifications": notifs,
	})
}
