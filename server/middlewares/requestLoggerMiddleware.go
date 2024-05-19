package middlewares

import (
	"fmt"
	"net/http"
	"time"
)

func RequestLoggerMiddleware(next http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("%v Method: %s, Path: %s\n", time.Now(), r.Method, r.URL.Path)
		next.ServeHTTP(w, r)
	}
}
