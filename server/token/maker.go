package token

import (
	"time"

	"github.com/gofrs/uuid"
)

type Maker interface {
	CreateToken(email string, duration time.Duration) (string, error)
	VerifyToken(token string) (*Payload, error)
	CreateRefreshToken(id uuid.UUID) (string, error)
}
