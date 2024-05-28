package routes

import (
	"net/http"

	"github.com/kailashchoudhary11/server/auth"
	"github.com/kailashchoudhary11/server/handlers"
)

func GetRouter() *http.ServeMux {
	router := http.NewServeMux()

	router.HandleFunc("/", handlers.IndexHandler)

	router.HandleFunc("/projects/all", handlers.GetProjects)

	router.HandleFunc("/projects", handlers.UpdateProjects)

	router.HandleFunc("/github/login", auth.HandleGitHubLogin)

	router.HandleFunc("/github/callback", auth.HandleGitHubCallback)

	return router
}
