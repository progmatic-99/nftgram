package models

import "github.com/gofrs/uuid"

type Wallet struct {
	Opensea string    `json:"opensea"`
	Rarible string    `json:"rarible"`
	UserID  uuid.UUID `json:"-"`
}
