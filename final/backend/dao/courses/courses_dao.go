package courses

type Course struct {
	Id          int    `json:"id"`
	Name        string `json:"nombre"`
	Duration    int    `json:"duracion"`
	Description string `json:"descripcion"`
	Requirement string `json:"requisitos"`
	Topic       string `json:"tema"`
	Price       int    `json:"precio"`
}
