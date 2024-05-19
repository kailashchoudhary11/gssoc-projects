package routes

import (
	"net/http"

	"github.com/kailashchoudhary11/server/handlers"
)

func GetRouter() *http.ServeMux {
	router := http.NewServeMux()

	router.HandleFunc("/", handlers.IndexHandler)

	router.HandleFunc("GET /projects", handlers.GetProjects)

	router.HandleFunc("POST /projects", handlers.UpdateProjects)

	return router
}
