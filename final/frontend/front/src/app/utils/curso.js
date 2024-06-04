import axios from "axios"

export function searchCurso(query) {
    axios
    .post('http://localhost:8080/courses/search', {
        query: query // enviar directamente la cadena de búsqueda
    })
    .then(function (response) {
        return response.data;
    })
    .catch(function (error) {
        console.error("Hubo un Error en la busqueda:", error);
        throw error;
    });

    return <div> hola </div>
}