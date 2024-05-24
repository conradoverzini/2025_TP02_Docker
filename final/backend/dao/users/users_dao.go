package users

type User struct {
	Id           int    `json:"id"`
	Name         string `json:"nombre"`
	Surname      string `json:"apellido"`
	Nickname     string `json:"nickname"`
	Email        string `json:"email"`
	PasswordHash string `json:"Contraseña"`
	Type         bool   `json:"Tipo"`
}
