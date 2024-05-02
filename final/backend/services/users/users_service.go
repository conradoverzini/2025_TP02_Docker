package users

import "backend/domain/users"

//service no usa gin

func Login(user string, password string) users.LoginResponse {
	return users.LoginResponse{
		Token: "abcd1234",
	}

}
