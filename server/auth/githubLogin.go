package auth

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/kailashchoudhary11/server/initializers"
	"github.com/kailashchoudhary11/server/services"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/github"
)

var GithubOAuthConfig *oauth2.Config

func init() {
	// initializers.LoadEnvVariables()
	GithubOAuthConfig = &oauth2.Config{
		ClientID:     os.Getenv("CLIENT_ID"),
		ClientSecret: os.Getenv("CLIENT_SECRET"),
		RedirectURL:  os.Getenv("REDIRECT_URL"),
		Scopes:       []string{"user:email"},
		Endpoint:     github.Endpoint,
	}
}

func HandleGitHubLogin(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	url := GithubOAuthConfig.AuthCodeURL("state", oauth2.AccessTypeOnline)
	response := map[string]string{
		"url": url,
	}
	json.NewEncoder(w).Encode(response)
}

func HandleGitHubCallback(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	code := r.URL.Query().Get("code")
	token, err := GithubOAuthConfig.Exchange(context.Background(), code)
	if err != nil {
		log.Fatal("Error in verifying the token.", err)
	}
	githubClient := initializers.GetAuthenticatedClient(token.AccessToken)
	services.UpdateProjects(githubClient)
	fmt.Fprintf(w, "Logged In")
}
