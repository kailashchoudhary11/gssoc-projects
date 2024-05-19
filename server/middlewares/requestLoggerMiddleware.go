package middlewares

import (
	"fmt"
	"net/http"
)

func RequestLoggerMiddleware(next http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("Method: %s, Path: %s", r.Method, r.URL.Path)
		next.ServeHTTP(w, r)
	}
}
