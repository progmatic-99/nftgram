package util

import (
	"time"

	"github.com/spf13/viper"
)

type Config struct {
	DBUrl            string        `mapstructure:"DB_URL"`
	SecretKey        string        `mapstructure:"TOKEN_SYMMETRIC_KEY"`
	SecretRefreshKey string        `mapstructure:"REFRESH_TOKEN"`
	TokenDuration    time.Duration `mapstructure:"ACCESS_TOKEN_DURATION"`
}

func LoadConfig(path string) (config Config, err error) {
	viper.AutomaticEnv()
	env := viper.GetString("env")

	if env == "production" {
		config := Config{
			DBUrl:            viper.GetString("db_url"),
			SecretKey:        viper.GetString("token_symmetric_key"),
			SecretRefreshKey: viper.GetString("refresh_token"),
			TokenDuration:    viper.GetDuration("access_token_duration"),
		}

		return config, nil
	}

	viper.AddConfigPath(path)
	viper.SetConfigName("app")
	viper.SetConfigType("env")

	err = viper.ReadInConfig()
	if err != nil {
		return
	}

	err = viper.Unmarshal(&config)
	return
}
