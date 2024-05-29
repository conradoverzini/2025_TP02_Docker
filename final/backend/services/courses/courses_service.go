package courses

import (
	"backend/clients"
	"backend/domain"

	"fmt"
	"strings"
)

func Search(query string) ([]domain.Course, error) {
	trimmed := strings.TrimSpace(query)

	courses, err := clients.GetCoursewithFilter(trimmed)

	if err != nil {
		return nil, fmt.Errorf("Error getting courses from DB: %s", err)
	}

	results := make([]domain.Course, 0)

	for _, course := range courses {
		results = append(results, domain.Course{
			Id:           course.Id,
			Title:        course.Title,
			Description:  course.Description,
			Category:     course.Category,
			CreationDate: course.CreationDate,
			LastUpdate:   course.LastUpdate,
		})
	}

	return results, nil
}

func Get(ID int64) (domain.Course, error) {
	course, err := clients.GetCourseById(ID)

	if err != nil {
		return domain.Course{}, fmt.Errorf("Error getting course from DB: %v", err)
	}

	return domain.Course{
		Id:           course.Id,
		Title:        course.Title,
		Description:  course.Description,
		Category:     course.Category,
		CreationDate: course.CreationDate,
		LastUpdate:   course.LastUpdate,
	}, nil
}

func Subscription(userID int64, courseID int64) error {

	if _, err := clients.GetUserById(userID); err != nil {
		return fmt.Errorf("error getting user from DB: %v", err)
	}

	if _, err := clients.GetCourseById(courseID); err != nil {
		return fmt.Errorf("error getting course from DB: %v", err)
	}

	if err := clients.InsertSubscription(userID, courseID); err != nil {
		return fmt.Errorf("error inserting subscription into DB: %v", err)
	}

	return nil
}

func CreateCourse(Title string, Description string, Category string) (domain.Result, error) {
	return domain.Result{}, nil
}

func UpdateCorse(Title string, Description string, Category string) error {
	return nil
}

func DeleteCourse(courseID int64) (domain.Result, error) {
	return domain.Result{}, nil
}
