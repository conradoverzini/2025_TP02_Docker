package clients

import (
	"fmt"

	"backend/dao"

	log "github.com/sirupsen/logrus"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

const (
	connectionString = "%s:%s@tcp(%s:%d)/:%s?charset=utf8&parseTime=True"
)

var (
	DBClient *gorm.DB
)

func init() {
	// DB Connections Parameters
	dbName := "final"     //Nombre de la base de datos local
	dbUser := "root"      // Usuario de la base de datos, habitualmente root
	dbPassword := ""      //Password del root en la instalacion
	dbHost := "localhost" //Host de la base de datos. Habitualmente 127.0.0.1
	dbPort := 3306

	connection := fmt.Sprintf(connectionString, dbUser, dbPassword, dbHost, dbPort, dbName)

	db, err := gorm.Open(mysql.Open(connection), &gorm.Config{})
	if err != nil {
		panic(fmt.Errorf("error connecting to DB: %v", err))
	}
	DBClient = db
}

func StartDB() {
	var user dao.User
	if err := DBClient.AutoMigrate(&user); err != nil {
		panic(fmt.Errorf("error creating entities: %v", err))
	}
}

func GetUserById(ID int64) (dao.User, error) {
	var user dao.User

	result := DBClient.Where("Id = ?", ID).First(&user)

	if result.Error != nil {
		return user, fmt.Errorf("not found user with ID: %d", ID)
	}

	log.Debug("User: ", user)
	return user, nil
}

func GetUserByEmail(email string) (dao.User, error) {
	var user dao.User

	result := DBClient.Where("Email = ?", email).First(&user)

	if result.Error != nil {
		return user, fmt.Errorf("not found user with email: %s", email)
	}

	log.Debug("User: ", user)
	return user, nil
}

func GetCourseById(ID int64) (dao.Course, error) {
	var course dao.Course

	result := DBClient.Where("Id = ?", ID).First(&course)

	if result.Error != nil {
		return course, fmt.Errorf("not found course with ID: %d", ID)
	}

	log.Debug("Course: ", course)
	return course, nil
}

func GetCoursewithFilter(query string) ([]dao.Course, error) {
	var courses []dao.Course

	result := DBClient.Where("title LIKE ? OR description LIKE ? OR category LIKE ?", "%"+query+"%", "%"+query+"%", "%"+query+"%").Find(&courses)

	if result.Error != nil {
		return nil, fmt.Errorf("not found course with filter: %s", query)
	}

	return courses, nil
}

func InsertSubscription(userID int64, courseID int64) error {
	var existingSubscription dao.Subscription

	result := DBClient.Where("user_id = ? AND course_id = ?", userID, courseID).First(&existingSubscription)

	if result.Error == nil {
		return fmt.Errorf("subscription already exists for user %d and course %d", userID, courseID)
	}

	if result.Error != nil && result.Error != gorm.ErrRecordNotFound {
		return fmt.Errorf("error checking for existing subscription for user %d and course %d", userID, courseID)
	}

	subscription := dao.Subscription{
		User_Id:   userID,
		Course_Id: courseID,
	}

	result = DBClient.Create(&subscription)
	if result.Error != nil {
		return fmt.Errorf("error inserting subscription for user %d and course %d", userID, courseID)
	}

	log.Debug("Subscription created: ", subscription)
	return nil

}
