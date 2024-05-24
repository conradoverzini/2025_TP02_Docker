package courses

type CoursesData struct {
	Id          int    `gorm:"primaryKey"`
	Name        string `gorm:"type:varchar(50);not null"`
	Duration    int    `gorm:"not null"`
	Description string `gorm:"type:varchar(50);not null"`
	Requirement string `gorm:"type:varchar(50);not null"`
	Topic       string `gorm:"type:varchar(50);not null"`
	Price       int    `gorm:"not null"`
}
