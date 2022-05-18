package handlers

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/progmatic-99/nftgram/server/models"
	"github.com/progmatic-99/nftgram/server/token"
)

func (h handler) LikePost(c *gin.Context) {
	var post models.Post

	if err := c.ShouldBindJSON(&post); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": err.Error(),
		})
		return
	}

	payload, exists := c.Get("payload")
	if !exists {
		return
	}

	var storedUser models.User
	if err := h.DB.First(&storedUser, "email = ?", payload.(*token.Payload).Email).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": "User not found!!",
		})

		return
	}

	err := h.DB.Model(&models.Post{}).Create(map[string]interface{}{
		"Name":        post.Name,
		"Description": post.Description,
		"OpenseaLink": post.OpenseaLink,
		"Img":         post.Img,
		"ProjectLink": post.ProjectLink,
		"UserID":      storedUser.ID,
	}).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"msg": "Post added successfully!!",
	})
}
