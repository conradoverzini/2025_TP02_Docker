package courses

import (
	courseDomain "backend/domain"
	courseService "backend/services/courses"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func Search(c *gin.Context) {
	var searchRequest courseDomain.SearchRequest

	if err := c.ShouldBindJSON(&searchRequest); err != nil {
		c.JSON(http.StatusBadRequest, courseDomain.Result{
			Message: fmt.Sprintf("Invalid request: %s", err.Error()),
		})
		return
	}

	results, err := courseService.Search(searchRequest.Query)
	if err != nil {
		c.JSON(http.StatusInternalServerError, courseDomain.Result{
			Message: fmt.Sprintf("Error in Search: %s", err.Error()),
		})
		return
	}

	c.JSON(http.StatusOK, courseDomain.SearchResponse{
		Result: results,
	})

}

func Get(c *gin.Context) {
	id, err := strconv.ParseInt(c.Param("id"), 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, courseDomain.Result{
			Message: fmt.Sprintf("Invalid Id: %s", err.Error()),
		})

		return
	}

	course, err := courseService.Get(id)

	if err != nil {
		c.JSON(http.StatusNotFound, courseDomain.Result{
			Message: fmt.Sprintf("Error in Get: %s", err.Error()),
		})

		return
	}

	c.JSON(http.StatusOK, course)

}

func Subscription(c *gin.Context) {
	var subscribeRequest courseDomain.SubscribeRequest

	if err := c.ShouldBindJSON(&subscribeRequest); err != nil {
		c.JSON(http.StatusBadRequest, courseDomain.Result{
			Message: fmt.Sprintf("Invalid request: %s", err.Error()),
		})
		return
	}

	if err := courseService.Subscription(subscribeRequest.UserId, subscribeRequest.CourseId); err != nil {
		c.JSON(http.StatusConflict, courseDomain.Result{
			Message: fmt.Sprintf("Error in Subscription: %s", err.Error()),
		})
		return
	}

	c.JSON(http.StatusCreated, courseDomain.Result{
		Message: fmt.Sprintf("Successful subscription of user %d to course %d", subscribeRequest.UserId, subscribeRequest.CourseId),
	})

}

func CreateCourse(c *gin.Context) {}

func UpdateCorse(c *gin.Context) {}

func DeleteCourse(c *gin.Context) {}
