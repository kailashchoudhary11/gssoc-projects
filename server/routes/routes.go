package routes

import (
	"fmt"
	"net/http"
)

func GetRouter() *http.ServeMux {
	router := http.NewServeMux()

	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("Got the request")
	})

	return router
}
