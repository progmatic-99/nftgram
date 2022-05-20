package handlers

import "github.com/progmatic-99/nftgram/server/models"

func (h handler) GetUser(email string) (*models.User, error) {
	var storedUser models.User
	if err := h.DB.First(&storedUser, "email = ?", email).Error; err != nil {
		return nil, err
	}

	return &storedUser, nil
}
