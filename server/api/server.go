package api

import (
	"net/http"

	"github.com/kailashchoudhary11/server/routes"
)

type APIServer struct {
	Addr string
}

func NewAPIServer(addr string) *APIServer {
	apiServer := APIServer{Addr: addr}
	return &apiServer
}

func (server *APIServer) Run() {
	router := routes.GetRouter()
	http.ListenAndServe(server.Addr, router)
}
