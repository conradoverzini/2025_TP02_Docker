package users

// Domain Classes - "User" entities
//`gorm:...`  permiten configurar el comportamiento de los campos en la base de datos
type UserData struct {
	Id           int    `gorm:"primaryKey"`                //Clave primaria de la bd
	Name         string `gorm:"type:varchar(50);not null"` //Nombre será de tipo VARCHAR con una longitud máxima de 350 caracteres en la base de datos y no puede ser nulo
	Surname      string `gorm:"type:varchar(50);not null"`
	Nickname     string `gorm:"type:varchar(50);not null"`
	Email        string `gorm:"type:varchar(150);not null"`
	PasswordHash string `gorm:"type:varchar(100);not null"`
	Type         bool   `gorm:"not null;default:true"`
}

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Token string `json:"token"`
}
