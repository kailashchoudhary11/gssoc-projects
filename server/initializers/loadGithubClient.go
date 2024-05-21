package initializers

import (
	"github.com/google/go-github/v62/github"
)

var GithubClient *github.Client

func LoadGithubClient() {
	GithubClient = github.NewClient(nil)
}

func GetAuthenticatedClient(authToken string) *github.Client {
	return github.NewClient(nil).WithAuthToken(authToken)
}
