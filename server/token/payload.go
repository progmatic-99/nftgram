package token

import (
	"errors"
	"time"

	"github.com/gofrs/uuid"
)

var (
	ErrExpiredToken = errors.New("token has expired")
	ErrInvalidToken = errors.New("token is invalid")
)

type Payload struct {
	Email      string    `json:"email"`
	MetamaskID string    `json:"metamaskId"`
	PhantomID  string    `json:"phantomId"`
	CreatedAt  time.Time `json:"createdAt"`
	ExpiredAt  time.Time `json:"expiredAt"`
}

type RefreshPayload struct {
	ID        uuid.UUID `json:"id"`
	ExpiredAt time.Time `json:"expiredAt"`
}

func NewPayload(email string, metamaskId string, phantomId string, duration time.Duration) (*Payload, error) {

	payload := &Payload{
		Email:      email,
		MetamaskID: metamaskId,
		PhantomID:  phantomId,
		CreatedAt:  time.Now(),
		ExpiredAt:  time.Now().Add(duration),
	}

	return payload, nil
}

func (payload *Payload) Valid() error {
	if time.Now().After(payload.ExpiredAt) {
		return ErrExpiredToken
	}

	return nil
}

func NewRefreshPayload(id uuid.UUID) (*RefreshPayload, error) {
	payload := &RefreshPayload{
		ID:        id,
		ExpiredAt: time.Now().Add(time.Hour * 24),
	}

	return payload, nil
}

func (payload *RefreshPayload) Valid() error {
	if time.Now().After(payload.ExpiredAt) {
		return ErrExpiredToken
	}

	return nil
}
