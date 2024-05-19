package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"os"

	"github.com/kailashchoudhary11/server/initializers"
	"github.com/kailashchoudhary11/server/models"
)

func init() {
	initializers.LoadEnvVariables()
	initializers.ConnectToDB()
}

func main() {
	dataFile, err := os.Open("./data/projects.json")
	if err != nil {
		log.Fatal("Could not open data file")
	}
	defer dataFile.Close()

	var count int64
	initializers.DATABASE.Model(&models.Project{}).Count(&count)
	fmt.Println("Number of rows in the table:", count)

	if count > 0 {
		fmt.Println("Deleting Existing records")
		initializers.DATABASE.Where("1 = 1").Delete(&models.Project{})
	}

	var projects []models.Project
	byteValue, _ := io.ReadAll(dataFile)
	json.Unmarshal(byteValue, &projects)
	result := initializers.DATABASE.Create(projects)
	if result.Error != nil {
		fmt.Println("Error in inserting data to database")
	}
	fmt.Printf("Inserted %v records in the database\n", result.RowsAffected)
}
