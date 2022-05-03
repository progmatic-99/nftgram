package models

import (
	"github.com/gofrs/uuid"
)

type Post struct {
	Name        string `json:"name"`
	Description string `json:"desc"`
	Img         string `json:"img"`
	OpenseaLink string `json:"opensea_link"`
	ProjectLink string `json:"project_link"`
	UserID      uuid.UUID
}
