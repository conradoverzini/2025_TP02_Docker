package courses

import (
	"backend/clients"
	"backend/dao"
	"backend/domain"
	"time"

	"errors"
	"fmt"
	"strings"
)

func SearchCourse(query string) ([]domain.Course, error) {
	trimmed := strings.TrimSpace(query)

	courses, err := clients.GetCoursewithQuery(trimmed)

	if err != nil {
		return nil, fmt.Errorf("error getting courses from DB: %s", err)
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

func GetCourse(ID int64) (domain.Course, error) {
	course, err := clients.GetCourseById(ID)

	if err != nil {
		return domain.Course{}, fmt.Errorf("error getting course from DB: %v", err)
	}

	return domain.Course{
		Id:           course.Id,
		Title:        course.Title,
		Description:  course.Description,
		Category:     course.Category,
		Instructor:   course.Instructor,
		Duration:     course.Duration,
		Requirement:  course.Requirement,
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

func CreateCourse(title string, description string, category string, instructor string, duration int64, requirement string) error {

	if strings.TrimSpace(title) == "" {
		return errors.New("title is required")
	}

	if strings.TrimSpace(description) == "" {
		return errors.New("description is required")
	}

	if strings.TrimSpace(category) == "" {
		return errors.New("category is required")
	}

	if strings.TrimSpace(instructor) == "" {
		return errors.New("instructor is required")
	}

	if duration == 0 {
		return errors.New("duration is required")
	}

	if strings.TrimSpace(requirement) == "" {
		return errors.New("requirement is required")
	}

	NewCourse := dao.Course{
		Title:        title,
		Description:  description,
		Category:     category,
		Instructor:   instructor,
		Duration:     duration,
		Requirement:  requirement,
		CreationDate: time.Now(),
		LastUpdate:   time.Now(),
	}

	err := clients.CreateCourse(NewCourse)
	if err != nil {
		return fmt.Errorf("error creating course from DB: %v", err)
	}

	return nil
}

func UpdateCourse(courseID int64, title string, description string, category string, instructor string, duration int64, requirement string) error {

	if strings.TrimSpace(title) == "" {
		return errors.New("title is required")
	}

	if strings.TrimSpace(description) == "" {
		return errors.New("description is required")
	}

	if strings.TrimSpace(category) == "" {
		return errors.New("category is required")
	}

	if strings.TrimSpace(instructor) == "" {
		return errors.New("instructor is required")
	}

	if duration == 0 {
		return errors.New("duration is required")
	}

	if strings.TrimSpace(requirement) == "" {
		return errors.New("requirement is required")
	}

	courseUpdate := dao.Course{
		Title:       title,
		Description: description,
		Category:    category,
		Instructor:  instructor,
		Duration:    duration,
		Requirement: requirement,
	}

	err := clients.UpdateCourse(courseID, courseUpdate)
	if err != nil {
		return fmt.Errorf("error updating course from DB: %v", err)
	}
	return nil
}

func DeleteCourse(courseID int64) error {

	if err := clients.DeleteCourseById(courseID); err != nil {
		return fmt.Errorf("error deleting course in DB: %v", err)
	}

	if err := clients.DeleteSubscriptionById(courseID); err != nil {
		return fmt.Errorf("error deleting subscriptcion in DB: %v", err)
	}

	return nil
}
