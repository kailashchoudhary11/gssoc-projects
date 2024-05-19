package handlers

import (
	"fmt"
	"net/http"
)

func IndexHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Index Route\n")
}
