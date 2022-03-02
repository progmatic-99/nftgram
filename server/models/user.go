package models

import (
	"github.com/gofrs/uuid"
	"gorm.io/gorm"
)

type User struct {
	ID       uuid.UUID `json:"nonce" gorm:"type:uuid;primaryIndex;"`
	MetaMask string    `json:"metamask_id"`
	Phantom  string    `json:"phantom_id"`
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID, err = uuid.NewV4()
	if err != nil {
		panic(err)
	}

	return nil
}
