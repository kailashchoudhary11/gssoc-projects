package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/kailashchoudhary11/server/initializers"
	"github.com/kailashchoudhary11/server/models"
)

func ProjectsHandler(w http.ResponseWriter, r *http.Request) {
	var projects []models.Project
	res := initializers.DATABASE.Find(&projects)
	if res.Error != nil {
		log.Fatal("Unable to fetch projects")
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(projects)
	fmt.Fprint(w, projects)
}
