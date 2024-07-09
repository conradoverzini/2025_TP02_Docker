package users

import (
	"backend/clients"
	"backend/dao"
	"backend/domain"
	"crypto/md5"
	"errors"
	"fmt"
	"strings"

	jwt "github.com/golang-jwt/jwt"
)

//service no usa gin

var jwtKey = []byte("secret_key")

func Login(email string, password string) (string, error) {

	if strings.TrimSpace(email) == "" {
		return "", errors.New("email is required")
	}

	if strings.TrimSpace(password) == "" {
		return "", errors.New("password is required")
	}

	hash := fmt.Sprintf("%x", md5.Sum([]byte(password)))

	user, err := clients.GetUserByEmail(email)
	if err != nil {
		return "", fmt.Errorf("error getting user from DB: %v", err)
	}

	if hash != user.PasswordHash {
		return "", errors.New("invalid credentials")
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"userID": user.Id,
	})

	tokenString, err := token.SignedString(jwtKey)
	if err != nil {
		return "", fmt.Errorf("error signing JWT: %v", err)
	}

	return tokenString, nil
}

func UserRegister(nickname string, email string, password string, typeUser bool) error {

	if strings.TrimSpace(nickname) == "" {
		return errors.New("nickname is required")
	}

	if strings.TrimSpace(email) == "" {
		return errors.New("email is required")
	}

	if strings.TrimSpace(password) == "" {
		return errors.New("password is required")
	}

	hash := fmt.Sprintf("%x", md5.Sum([]byte(password)))

	NewUser := dao.User{
		Nickname:     nickname,
		Email:        email,
		PasswordHash: hash,
		Type:         typeUser,
	}

	err := clients.CreateUser(NewUser)
	if err != nil {
		return fmt.Errorf("error creating user from DB: %v", err)
	}

	return nil
}

func SubscriptionList(UserID int64) ([]domain.Course, error) {
	courseIDs, err := clients.GetCourseIdsByUserId(UserID)
	if err != nil {
		return nil, fmt.Errorf("error getting course IDs for user ID %d: %v", UserID, err)
	}

	var courses []dao.Course

	for _, courseID := range courseIDs {
		course, err := clients.GetCourseById(courseID)
		if err != nil {
			return nil, fmt.Errorf("error getting course with ID %d: ", courseID)
		}
		courses = append(courses, course)
	}

	results := make([]domain.Course, 0)

	for _, course := range courses {
		results = append(results, domain.Course{
			Id:           course.Id,
			Title:        course.Title,
			Description:  course.Description,
			Category:     course.Category,
			Instructor:   course.Instructor,
			Duration:     course.Duration,
			Requirement:  course.Requirement,
			CreationDate: course.CreationDate,
			LastUpdate:   course.LastUpdate,
		})
	}

	return results, nil
}

func AddComment(userID int64, courseID int64, comment string) error {

	if _, err := clients.GetUserById(userID); err != nil {
		return fmt.Errorf("error getting user from DB: %v", err)
	}

	if _, err := clients.GetCourseById(courseID); err != nil {
		return fmt.Errorf("error getting course from DB: %v", err)
	}

	if strings.TrimSpace(comment) == "" {
		return errors.New("comment is required")
	}

	if err := clients.InsertComment(userID, courseID, comment); err != nil {
		return fmt.Errorf("error inserting comment into DB: %v", err)
	}

	return nil
}
