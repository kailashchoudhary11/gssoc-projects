package main

import (
	"fmt"
	"os"

	"github.com/kailashchoudhary11/server/api"
	"github.com/kailashchoudhary11/server/initializers"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.LoadGithubClient()
	initializers.ConnectToDB()
}

func main() {
	port := os.Getenv("PORT")
	addr := ":" + port
	fmt.Println("Running server at Port", port)
	server := api.NewAPIServer(addr)
	server.Run()
}
