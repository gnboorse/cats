package main

import (
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
)

var (
	// BuildVersion  the API version, populated by ldflags when building
	BuildVersion string
	// BuildTimestamp the build timestamp, populated by ldflags when building
	BuildTimestamp string
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/v1/cats", GetCatsHandler).Methods("GET")
	r.HandleFunc("/v1/cats", CreateCatHandler).Methods("POST")
	r.HandleFunc("/v1/cats/{id}", GetCatHandler).Methods("GET")
	r.HandleFunc("/v1/cats/{id}", UpdateCatHandler).Methods("PUT")
	r.HandleFunc("/v1/cats/{id}", DeleteCatHandler).Methods("DELETE")
	r.HandleFunc("/v1/version", GetVersionHandler).Methods("GET")
	r.NotFoundHandler = r.NewRoute().HandlerFunc(NotFoundHandler).GetHandler()
	r.MethodNotAllowedHandler = r.NewRoute().HandlerFunc(MethodNotAllowedHandler).GetHandler()
	http.Handle("/", corsHandler(r))

	fmt.Println("Initializing postgres DB connection")
	err := InitDB()
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println("Database connection successful")

	port := "8080"
	fmt.Printf("Listening on port: %v\n", port)

	// listen on the provided port
	err = http.ListenAndServe(":"+port, r)
	if err != nil {
		fmt.Println(err)
	}
}

func corsHandler(h http.Handler) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method == "OPTIONS" {
			//handle preflight in here
		} else {
			h.ServeHTTP(w, r)
		}
	}
}
