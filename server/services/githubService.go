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
	"github.com/kailashchoudhary11/server/models"
)

type ProjectDetail struct {
	owner    string
	repoName string
}

func getProjectDetails(projectLink string) (ProjectDetail, error) {
	split := strings.Split(projectLink, "/")
	if len(split) < 5 {
		fmt.Println("Invalid Project Link", projectLink)
		return ProjectDetail{}, errors.New("invalid project link")
	}
	projectDetail := ProjectDetail{owner: split[3], repoName: split[4]}
	return projectDetail, nil
}

func getOpenIssuesCount(projectLink string, githubClient *github.Client) uint16 {
	client := initializers.GithubClient
	if githubClient != nil {
		client = githubClient
	}
	projectDetails, err := getProjectDetails(projectLink)
	if err != nil {
		fmt.Println(err)
		return 0
	}

	repo, _, err := client.Repositories.Get(context.Background(), projectDetails.owner, projectDetails.repoName)
	if err != nil {
		fmt.Println(err)
		return 0
	}

	return uint16(*repo.OpenIssuesCount)
}

func getPRDetails(projectLink string, githubClient *github.Client) (time.Time, uint16) {
	client := initializers.GithubClient
	if githubClient != nil {
		client = githubClient
	}
	maxTime := time.Date(2024, 5, 10, 10, 0, 0, 0, time.UTC)
	projectDetails, err := getProjectDetails(projectLink)
	if err != nil {
		fmt.Println(err)
		return maxTime, 0
	}

	opts := &github.PullRequestListOptions{State: "closed", Sort: "updated", Direction: "desc", ListOptions: github.ListOptions{PerPage: 100}}
	prs, _, err := client.PullRequests.List(context.Background(), projectDetails.owner, projectDetails.repoName, opts)
	if err != nil {
		fmt.Println(err)
		return maxTime, 0
	}

	for _, pr := range prs {
		if pr.ClosedAt.After(maxTime) {
			maxTime = pr.ClosedAt.Time
		}
	}

	return maxTime, uint16(len(prs))
}

func UpdateProjects(githubClient *github.Client) []models.Project {
	var projects []models.Project
	res := initializers.DATABASE.Find(&projects)
	if res.Error != nil {
		log.Fatal("Unable to fetch projects")
	}
	for _, project := range projects {
		latestMergedPRTime, PRCount := getPRDetails(project.GithubLink, githubClient)
		project.LastPRMergedAt = latestMergedPRTime
		project.OpenPRCount = PRCount
		project.OpenIssueCount = getOpenIssuesCount(project.GithubLink, githubClient)
		fmt.Println("The latest merged PR time is", project.LastPRMergedAt)
		fmt.Println("Number of open issues count", project.OpenIssueCount)
		initializers.DATABASE.Save(project)
		time.Sleep(time.Millisecond)
	}
	return projects
}
