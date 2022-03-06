package handlers

import (
	"time"

	"github.com/progmatic-99/nftgram/server/token"
	"gorm.io/gorm"
)

type handler struct {
	DB            *gorm.DB
	tokenMaker    token.Maker
	TokenDuration time.Duration
}

func New(db *gorm.DB, tokenMaker token.Maker, duration time.Duration) handler {
	return handler{db, tokenMaker, duration}
}
