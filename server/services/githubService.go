package services

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/google/go-github/v62/github"
	"github.com/kailashchoudhary11/server/initializers"
)

func ListRepoIssues() {
	issues, _, err := initializers.GithubClient.Issues.ListByRepo(context.Background(), "kailashchoudhary11", "steganohide", nil)
	if err != nil {
		log.Fatal("Error in fetching issues")
	}
	fmt.Println("Issues are: ", issues)
}

func LatestMergedPRTime(owner, repo string) time.Time {
	opts := &github.PullRequestListOptions{State: "closed", Sort: "updated", Direction: "desc"}

	prs, _, err := initializers.GithubClient.PullRequests.List(context.Background(), owner, repo, opts)
	if err != nil {
		log.Fatal("Error in fetching Pull requests")
	}

	maxTime := time.Date(2024, 5, 10, 10, 0, 0, 0, time.UTC)

	for _, pr := range prs {
		if pr.ClosedAt.After(maxTime) {
			maxTime = pr.ClosedAt.Time
		}
	}

	return maxTime
}
