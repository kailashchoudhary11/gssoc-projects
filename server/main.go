package main

import (
	"fmt"

	"github.com/kailashchoudhary11/server/api"
)

func main() {
	fmt.Println("Running server at Port 8000")
	server := api.NewAPIServer(":8000")
	server.Run()
}
