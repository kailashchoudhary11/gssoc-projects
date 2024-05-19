package initializers

import (
	"log"

	"github.com/lpernett/godotenv"
)

func LoadEnvVariables() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Unable to load env variables")
	}
}
