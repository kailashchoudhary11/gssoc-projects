package services

import (
	"context"
	"errors"
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/google/go-github/v62/github"
	"github.com/kailashchoudhary11/server/initializers"
)

type ProjectDetail struct {
	owner    string
	repoName string
}

func getProjectDetails(projectLink string) (ProjectDetail, error) {
	split := strings.Split(projectLink, "/")
	if len(split) < 5 {
		fmt.Printf("Invalid Project Link", projectLink)
		return ProjectDetail{}, errors.New("Invalid Project Link")
	}
	projectDetail := ProjectDetail{owner: split[3], repoName: split[4]}
	return projectDetail, nil
}

func ListRepoIssues() {
	issues, _, err := initializers.GithubClient.Issues.ListByRepo(context.Background(), "kailashchoudhary11", "steganohide", nil)
	if err != nil {
		log.Fatal("Error in fetching issues")
	}
	fmt.Println("Issues are: ", issues)
}

func LatestMergedPRTime(projectLink string) time.Time {
	maxTime := time.Date(2024, 5, 10, 10, 0, 0, 0, time.UTC)
	projectDetails, err := getProjectDetails(projectLink)
	if err != nil {
		return maxTime
	}

	opts := &github.PullRequestListOptions{State: "closed", Sort: "updated", Direction: "desc"}
	prs, _, err := initializers.GithubClient.PullRequests.List(context.Background(), projectDetails.owner, projectDetails.repoName, opts)
	if err != nil {
		log.Fatal("Error in fetching Pull requests", err)
	}

	for _, pr := range prs {
		if pr.ClosedAt.After(maxTime) {
			maxTime = pr.ClosedAt.Time
		}
	}

	return maxTime
}
