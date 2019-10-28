package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
)

// GetCatsHandler for the /cats endpoint
func GetCatsHandler(w http.ResponseWriter, r *http.Request) {
	// get all entities
	retrieved, err := RepositoryGetAll()

	// handle any errors that may have occurred
	if err != nil {
		fmt.Println(err)
		errMessage := makeErrorMessage(http.StatusInternalServerError, "An unexpected error occurred")
		writeResponse(w, errMessage, http.StatusInternalServerError)
		return
	}
	writeResponse(w, retrieved, 200)
}

// CreateCatHandler for the /cats endpoint
func CreateCatHandler(w http.ResponseWriter, r *http.Request) {
	// decode request body
	cat := &CatData{}
	err := json.NewDecoder(r.Body).Decode(cat)
	if err != nil {
		fmt.Println(err)
		errMessage := makeErrorMessage(http.StatusBadRequest, "Malformed JSON provided in request body")
		writeResponse(w, errMessage, http.StatusBadRequest)
		return
	}

	// create new entity
	newCat, err := RepositoryCreate(cat)

	// handle errors
	if err != nil {
		fmt.Println(err)
		errMessage := makeErrorMessage(http.StatusInternalServerError, "An unexpected error occurred")
		writeResponse(w, errMessage, http.StatusInternalServerError)
		return
	}

	// return newly created entity
	writeResponse(w, newCat, http.StatusOK)

}

// GetCatHandler for the /cats/{id} endpoint
func GetCatHandler(w http.ResponseWriter, r *http.Request) {
	// get ID from path params
	vars := mux.Vars(r)
	if val, ok := vars["id"]; ok {
		id, err := strconv.Atoi(val)
		if err != nil {
			fmt.Println(err)
			errMessage := makeErrorMessage(http.StatusBadRequest, "ID must be an integer")
			writeResponse(w, errMessage, http.StatusBadRequest)
			return
		}
		// get entity by ID
		retrieved, err := RepositoryGetOne(id)

		// error handling
		if err != nil {
			fmt.Println(err)
			if err == sql.ErrNoRows {
				errMessage := makeErrorMessage(http.StatusNotFound, "Record not found by ID provided")
				writeResponse(w, errMessage, http.StatusNotFound)
				return
			}
			errMessage := makeErrorMessage(http.StatusInternalServerError, "An unexpected error occurred")
			writeResponse(w, errMessage, http.StatusInternalServerError)
			return

		}

		// return entity found
		writeResponse(w, retrieved, http.StatusOK)
	}

}

// UpdateCatHandler for the /cats/{id} endpoint
func UpdateCatHandler(w http.ResponseWriter, r *http.Request) {
	// decode request body
	cat := &CatData{}
	err := json.NewDecoder(r.Body).Decode(cat)
	if err != nil {
		fmt.Println(err)
		errMessage := makeErrorMessage(http.StatusBadRequest, "Malformed JSON provided in request body")
		writeResponse(w, errMessage, http.StatusBadRequest)
		return
	}

	// get ID from path params
	vars := mux.Vars(r)
	if val, ok := vars["id"]; ok {
		id, err := strconv.Atoi(val)
		if err != nil {
			fmt.Println(err)
			errMessage := makeErrorMessage(http.StatusBadRequest, "ID must be an integer")
			writeResponse(w, errMessage, http.StatusBadRequest)
			return
		}

		// update in database
		updatedCat, err := RepositoryUpdate(cat, id)

		// handle errors
		if err != nil {
			fmt.Println(err)
			if err == sql.ErrNoRows {
				errMessage := makeErrorMessage(http.StatusNotFound, "Record not found by ID provided")
				writeResponse(w, errMessage, http.StatusNotFound)
				return
			}
			errMessage := makeErrorMessage(http.StatusInternalServerError, "An unexpected error occurred")
			writeResponse(w, errMessage, http.StatusInternalServerError)
			return
		}

		// return JSON entity
		writeResponse(w, updatedCat, http.StatusOK)
	}

}

// DeleteCatHandler for the /cats/{id} endpoint
func DeleteCatHandler(w http.ResponseWriter, r *http.Request) {
	// get ID from path params
	vars := mux.Vars(r)
	if val, ok := vars["id"]; ok {
		id, err := strconv.Atoi(val)
		if err != nil {
			fmt.Println(err)
			errMessage := makeErrorMessage(http.StatusBadRequest, "ID must be an integer")
			writeResponse(w, errMessage, http.StatusBadRequest)
			return
		}

		// delete from database
		deletedCat, err := RepositoryDelete(id)

		if err != nil {
			fmt.Println(err)
			if err == sql.ErrNoRows {
				errMessage := makeErrorMessage(http.StatusNotFound, "Record not found by ID provided")
				writeResponse(w, errMessage, http.StatusNotFound)
				return
			}
			errMessage := makeErrorMessage(http.StatusInternalServerError, "An unexpected error occurred")
			writeResponse(w, errMessage, http.StatusInternalServerError)
			return
		}

		// return JSON entity
		writeResponse(w, deletedCat, http.StatusOK)
	}
}

// GetVersionHandler for the /version endpoint
func GetVersionHandler(w http.ResponseWriter, r *http.Request) {
	versionInfo := Version{
		App:            "Cats API",
		Version:        BuildVersion,
		BuildTimestamp: BuildTimestamp,
	}
	writeResponse(w, versionInfo, http.StatusOK)
}

// NotFoundHandler for when the URL requested is not found
func NotFoundHandler(w http.ResponseWriter, r *http.Request) {
	message := makeErrorMessage(http.StatusNotFound, "The URL requested was not found")
	writeResponse(w, message, http.StatusNotFound)
}

// MethodNotAllowedHandler for when the user requests an endpoint with an invalid HTTP method
func MethodNotAllowedHandler(w http.ResponseWriter, r *http.Request) {
	message := makeErrorMessage(http.StatusMethodNotAllowed, "Method not allowed on the endpoint requested")
	writeResponse(w, message, http.StatusMethodNotAllowed)
}

func writeResponse(w http.ResponseWriter, data interface{}, status int) {
	w.WriteHeader(status)
	w.Header().Add("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}

func makeErrorMessage(code int, message string) ErrorMessage {
	return ErrorMessage{
		Code:    code,
		Title:   http.StatusText(code),
		Message: message,
	}
}
