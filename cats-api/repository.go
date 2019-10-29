package main

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

const (
	connectionString = "postgres://postgres:g3erVpeUgEUNh8Fj@db/postgres?sslmode=disable"
	selectAllQuery   = "select id, name, sex, breed, color, age, image_url from cats order by id asc"
	insertQuery      = "insert into cats (name, sex, breed, color, age, image_url) values ($1, $2, $3, $4, $5, $6) returning id, name, sex, breed, color, age, image_url"
	selectByIDQuery  = "select id, name, sex, breed, color, age, image_url from cats where id = $1"
	updateQuery      = "update cats set name = $1, sex = $2, breed = $3, color = $4, age = $5, image_url = $6 where id = $7 returning id, name, sex, breed, color, age, image_url"
	deleteQuery      = "delete from cats where id = $1 returning id, name, sex, breed, color, age, image_url"
)

// DB global database connection
var DB *sql.DB

// InitDB initializes the database connection
func InitDB() error {
	db, err := sql.Open("postgres", connectionString)
	if err != nil {
		return err
	}

	err = db.Ping()
	if err != nil {
		return err
	}

	DB = db
	return nil
}

// CloseDB close connection to the database
func CloseDB() error {
	return DB.Close()
}

// RepositoryGetAll retrieve all entities from the database
func RepositoryGetAll() ([]CatData, error) {
	rows, err := DB.Query(selectAllQuery)
	if err != nil {
		return nil, err
	}

	retrieved := []CatData{}
	defer rows.Close()
	for rows.Next() {
		var entity CatData
		err = rows.Scan(
			&entity.ID,
			&entity.Name,
			&entity.Sex,
			&entity.Breed,
			&entity.Color,
			&entity.Age,
			&entity.ImageURL,
		)
		if err != nil {
			fmt.Println(err)
		}
		retrieved = append(retrieved, entity)
	}

	return retrieved, nil
}

// RepositoryCreate create an entity in the database
func RepositoryCreate(cat *CatData) (*CatData, error) {
	stmt, err := DB.Prepare(insertQuery)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var entity CatData
	err = stmt.QueryRow(cat.Name, cat.Sex, cat.Breed, cat.Color, cat.Age, cat.ImageURL).Scan(
		&entity.ID,
		&entity.Name,
		&entity.Sex,
		&entity.Breed,
		&entity.Color,
		&entity.Age,
		&entity.ImageURL)
	if err != nil {
		return nil, err
	}
	return &entity, nil
}

// RepositoryGetOne retrieve an entity by ID from the database
func RepositoryGetOne(id int) (*CatData, error) {
	stmt, err := DB.Prepare(selectByIDQuery)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var entity CatData
	err = stmt.QueryRow(id).Scan(
		&entity.ID,
		&entity.Name,
		&entity.Sex,
		&entity.Breed,
		&entity.Color,
		&entity.Age,
		&entity.ImageURL,
	)

	if err != nil {
		return nil, err
	}

	return &entity, nil
}

// RepositoryUpdate update an entity by ID
func RepositoryUpdate(cat *CatData, id int) (*CatData, error) {
	stmt, err := DB.Prepare(updateQuery)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var entity CatData
	err = stmt.QueryRow(cat.Name, cat.Sex, cat.Breed, cat.Color, cat.Age, cat.ImageURL, id).Scan(
		&entity.ID,
		&entity.Name,
		&entity.Sex,
		&entity.Breed,
		&entity.Color,
		&entity.Age,
		&entity.ImageURL,
	)
	if err != nil {
		return nil, err
	}

	return &entity, nil
}

// RepositoryDelete delete an entity by ID
func RepositoryDelete(id int) (*CatData, error) {
	stmt, err := DB.Prepare(deleteQuery)
	if err != nil {
		return nil, err
	}
	defer stmt.Close()

	var entity CatData
	err = stmt.QueryRow(id).Scan(
		&entity.ID,
		&entity.Name,
		&entity.Sex,
		&entity.Breed,
		&entity.Color,
		&entity.Age,
		&entity.ImageURL,
	)
	if err != nil {
		return nil, err
	}

	return &entity, nil
}
