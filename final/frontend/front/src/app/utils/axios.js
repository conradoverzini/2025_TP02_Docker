import axios from 'axios';

export function search(query) {
    return axios
        .get('http://localhost:8080/courses/search', {
            params: { query: query } // Enviar el query como parámetro
        })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.error("Hubo un Error en la busqueda:", error);
            throw error;
        });
}


export function getCourses() {
    return axios
        .get('http://localhost:8080/courses')
        .then(function (response) {
            return response.data.results; 
        })
        .catch(function (error) {
            console.error("Hubo un Error en la carga de cursos:", error);
            throw error;
        });
}


export function login(loginRequest) {
    return axios
      .post('http://localhost:8080/users/login', loginRequest)
      .then(function (loginResponse) {
        console.log("Token: ", loginResponse.data);
        return loginResponse.data; 
      })
      .catch(function (error) {
        console.log("Hubo un Error en el logueo:", error);
        throw error;
      });
  }

export function registration(registrationRequest) {
    return axios
        .post('http://localhost:8080/users/register', registrationRequest)
        .then(function (registrationResponse) {
            console.log("Token: ", registrationResponse.data);
            return registrationResponse.data; 
        })
        .catch(function (error) {
            console.log("Hubo un Error en el registro:", error);
            throw error;
        });
}


export function subscribe(subscribeRequest) {
    return axios
        .post('http://localhost:8080/subscriptions', subscribeRequest)
        .then(function (result) {
            console.log("Resultado de la subscripcion: ", result.data);
            return result.data; 
        })
        .catch(function (error) {
            console.log("Hubo un Error en la subscripcion:", error);
            throw error;
        });
}


export function subscriptionList(userId) {
    return axios
        .get(`http://localhost:8080/users/subscriptions/${userId}`)
        .then(function (listResponse) {
            return listResponse.data;
        })
        .catch(function (error) {
            console.error("Hubo un Error en la busqueda de inscripciones:", error);
            throw error;
        });
}
