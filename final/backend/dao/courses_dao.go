package dao

import "time"

type Course struct {
	Id           int       `gorm:"primaryKey"`
	Title        string    `gorm:"type:varchar(50);not null"`
	Description  string    `gorm:"type:varchar(50);not null"`
	Category     string    `gorm:"type:varchar(50);not null"`
	CreationDate time.Time `gorm:"autoCreateTime"`
	lastUpdate   time.Time `gorm:"autoUpdateTime"`
}
