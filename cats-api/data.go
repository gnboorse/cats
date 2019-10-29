package main

// CatData data object representing a cat
type CatData struct {
	ID       uint32 `json:"id"`
	Name     string `json:"name"`
	Sex      string `json:"sex"`
	Breed    string `json:"breed"`
	Color    string `json:"color"`
	Age      uint32 `json:"age"`
	ImageURL string `json:"image_url"`
}

// Version data object representing the version of this API
type Version struct {
	App            string `json:"app"`
	Version        string `json:"version"`
	BuildTimestamp string `json:"build_timestamp"`
}

// ErrorMessage data object representing an error message returned by the API
type ErrorMessage struct {
	Code    int    `json:"code"`
	Title   string `json:"title"`
	Message string `json:"message"`
}
