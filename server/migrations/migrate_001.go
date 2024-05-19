package main

import (
	"fmt"

	"github.com/kailashchoudhary11/server/initializers"
	"github.com/kailashchoudhary11/server/models"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	initializers.DATABASE.AutoMigrate(&models.Project{})
}
