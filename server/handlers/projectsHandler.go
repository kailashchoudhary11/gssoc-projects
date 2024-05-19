package handlers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/kailashchoudhary11/server/initializers"
	"github.com/kailashchoudhary11/server/models"
	"github.com/kailashchoudhary11/server/services"
)

func GetProjects(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	var projects []models.Project
	res := initializers.DATABASE.Find(&projects).Order("last_pr_merged_at desc")
	if res.Error != nil {
		log.Fatal("Unable to fetch projects")
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(projects)
}

func UpdateProjects(w http.ResponseWriter, r *http.Request) {
	var projects []models.Project
	res := initializers.DATABASE.Find(&projects)
	if res.Error != nil {
		log.Fatal("Unable to fetch projects")
	}
	for _, project := range projects {
		project.LastPRMergedAt = services.LatestMergedPRTime(project.GithubLink)
		fmt.Println("The latest merged PR time is", project.LastPRMergedAt)
		initializers.DATABASE.Save(project)
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(projects)
}
