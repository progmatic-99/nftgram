package models

import (
	"github.com/gofrs/uuid"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID         uuid.UUID `json:"id" gorm:"type:uuid;primaryIndex;"`
	Email      string    `json:"email" gorm:"unique"`
	Password   string    `json:"password"`
	MetamaskID string    `json:"metamask_id"`
	PhantomID  string    `json:"phantom_id"`
	Posts      []Post    `json:"posts"`
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	u.ID, err = uuid.NewV4()
	if err != nil {
		panic(err)
	}

	return nil
}
