package models

import (
	"github.com/gofrs/uuid"
	"gorm.io/gorm"
)

type Post struct {
	gorm.Model
	Name        string `json:"name"`
	Description string `json:"desc"`
	Img         string `json:"img"`
	OpenseaLink string `json:"opensea_link"`
	ProjectLink string `json:"project_link"`
	UserID      uuid.UUID
}
