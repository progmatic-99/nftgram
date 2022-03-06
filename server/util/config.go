package util

import (
	"time"

	"github.com/spf13/viper"
)

type Config struct {
	DBUrl         string        `mapstructure:"DB_URL"`
	SecretKey     string        `mapstructure:"TOKEN_SYMMETRIC_KEY"`
	TokenDuration time.Duration `mapstructure:"ACCESS_TOKEN_DURATION"`
}

func LoadConfig(path string) (config Config, err error) {
	viper.AddConfigPath(path)
	viper.SetConfigName("app")
	viper.SetConfigType("env")

	viper.AutomaticEnv()

	err = viper.ReadInConfig()
	if err != nil {
		return
	}

	err = viper.Unmarshal(&config)
	return
}
