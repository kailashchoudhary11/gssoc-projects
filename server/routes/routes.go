package routes

import (
	"net/http"

	"github.com/kailashchoudhary11/server/auth"
	"github.com/kailashchoudhary11/server/handlers"
)

func GetRouter() *http.ServeMux {
	router := http.NewServeMux()

	router.HandleFunc("/", handlers.IndexHandler)

	router.HandleFunc("GET /projects", handlers.GetProjects)

	router.HandleFunc("POST /projects", handlers.UpdateProjects)

	router.HandleFunc("GET /github/login", auth.HandleGitHubLogin)

	router.HandleFunc("GET /github/callback", auth.HandleGitHubCallback)

	return router
}
