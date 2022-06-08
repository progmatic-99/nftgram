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

	storedUser, userNotFound := h.GetUser(payload.(*token.Payload).Email)
	if userNotFound != nil {
		c.JSON(http.StatusNotFound, gin.H{
			"error": userNotFound.Error(),
		})

		return
	}

	err := h.DB.Model(&models.Post{}).Create(map[string]interface{}{
		"Name":        post.Name,
		"Description": post.Description,
		"OpenseaLink": post.OpenseaLink,
		"Img":         post.Img,
		"ProjectLink": post.ProjectLink,
		"Owner":       post.Owner,
		"UserID":      storedUser.ID,
	}).Error
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	if len(post.Owner) > 0 {
		c.SSEvent("data", map[string]interface{}{
			"owner":        post.Owner,
			"user":         storedUser.Wallets.Opensea,
			"post_name":    post.Name,
			"img":          post.Img,
			"opensea_link": post.OpenseaLink,
		})

		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"msg": "Post added successfully!!",
	})
}
