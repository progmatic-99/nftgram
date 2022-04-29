package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/progmatic-99/nftgram/server/models"
	"github.com/progmatic-99/nftgram/server/token"
)

func (h handler) LikePost(c *gin.Context) {
	var posts []map[string]interface{}

	if err := c.ShouldBindJSON(&posts); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	payload, exists := c.Get("payload")
	if !exists {
		return
	}

	if err := h.DB.Model(&models.User{}).Where("Email = ?", payload.(token.Payload).Email).Update("posts", posts).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"msg": "Post added!!",
	})
}
