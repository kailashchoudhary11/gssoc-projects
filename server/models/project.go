package models

import (
	"time"

	"gorm.io/gorm"
)

type Project struct {
	gorm.Model
	Name           string `json:"project_name"`
	GithubLink     string `json:"project_link"`
	TechsUsed      string `json:"technology_used"`
	LastPRMergedAt time.Time
	OpenPRCount    uint16
	OpenIssueCount uint16
}
