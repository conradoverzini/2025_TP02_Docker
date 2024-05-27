package users

import (
	"backend/clients"
	"backend/dao"
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

	NewUser := dao.User{
		Nickname:     nickname,
		Email:        email,
		PasswordHash: password,
		Type:         typeUser,
	}

	err := clients.CreateUser(NewUser)
	if err != nil {
		return fmt.Errorf("error creating user from DB: %v", err)
	}

	return nil
}
