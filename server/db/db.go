package db

import (
	"github.com/progmatic-99/nftgram/server/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func Init(DBUrl string) *gorm.DB {
	db, err := gorm.Open(postgres.Open(DBUrl), &gorm.Config{})

	if err != nil {
		panic(err)
	}

	db.AutoMigrate(&models.User{})

	return db
}
