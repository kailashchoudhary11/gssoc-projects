package handlers

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/kailashchoudhary11/server/initializers"
	"github.com/kailashchoudhary11/server/models"
)

func ProjectsHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	var projects []models.Project
	res := initializers.DATABASE.Find(&projects)
	if res.Error != nil {
		log.Fatal("Unable to fetch projects")
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(projects)
}
