package token

import (
	"time"

	"github.com/gofrs/uuid"
)

type Maker interface {
	CreateToken(id uuid.UUID, email string, duration time.Duration) (string, error)
	VerifyToken(token string) (*Payload, error)
}
