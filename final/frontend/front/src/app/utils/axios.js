import axios from "axios";

export function search(query) {
  return axios
    .get("http://localhost:8080/courses/search", {
      params: { query: query }, 
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
    .get("http://localhost:8080/courses")
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
    .post("http://localhost:8080/users/login", loginRequest)
    .then(function (loginResponse) {
      console.log("Token: ", loginResponse.data.token); 
      const tokenType = loginResponse.data.token;
      const tokenId = loginResponse.data.token;
      localStorage.setItem('tokenType', tokenType);
      localStorage.setItem('tokenId', tokenId); 
      return loginResponse.data.token; 
    })
    .catch(function (error) {
      console.log("Hubo un Error en el logueo:", error);
      throw error;
    });
}

export function registration(registrationRequest) {
  return axios
    .post("http://localhost:8080/users/register", registrationRequest)
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
    .post("http://localhost:8080/subscriptions", subscribeRequest)
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
      return listResponse.data.results;
    })
    .catch(function (error) {
      console.error("Hubo un Error en la busqueda de inscripciones:", error);
      throw error;
    });
}

export function userAuthentication(token) {
  return axios
    .get("http://localhost:8080/users/authentication", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(function (response) {
      return response.data.message;
    })
    .catch(function (error) {
      console.error("Hubo un Error en la autenticación:", error);
      throw error;
    });
}

export function getUserId(token) {
  return axios
    .get("http://localhost:8080/users/userId", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(function (response) {
      return response.data.message;
    })
    .catch(function (error) {
      console.error("Hubo un Error en la obtencion del id:", error);
      throw error;
    });
}

export function createCourse(courseRequest) {
  return axios
  .post("http://localhost:8080/courses/create", courseRequest)
  .then(function (result) {
    console.log("Resultado de la creacion del curso: ", result.data);
    return result.data;
  })
  .catch(function (error) {
    console.log("Hubo un Error en la creacion:", error);
    throw error;
  });
}

export function deleteCourse(courseId) {
  return axios
  .delete(`http://localhost:8080/courses/delete/${courseId}`)
  .then(function (result) {
    console.log("Resultado de la eliminacion del curso: ", result.data);
    return result.data;
  })
  .catch(function (error) {
    console.log("Hubo un Error en la eliminacion:", error);
    throw error;
  });
}

export function updateCourse(courseId, updateRequest) {
  return axios
  .put(`http://localhost:8080/courses/update/${courseId}`, updateRequest)
  .then(function (result) {
    console.log("Resultado de la actualizacion del curso: ", result.data);
    return result.data;
  })
  .catch(function (error) {
    console.log("Hubo un Error en la actualizacion:", error);
    throw error;
  });
}

export function addComment(commentRequest) {
  return axios
  .post("http://localhost:8080/users/comments", commentRequest)
  .then(function (result) {
    console.log("Resultado del comentario: ", result.data);
    return result.data;
  })
  .catch(function (error) {
    console.log("Hubo un Error en en el comentado:", error);
    throw error;
  });
}

export function commentsList(courseId) {
  return axios
    .get(`http://localhost:8080/courses/comments/${courseId}`)
    .then(function (commentList) {
      return commentList.data.results;
    })
    .catch(function (error) {
      console.error("Hubo un Error en la obtencion de los comentarios:", error);
      throw error;
    });
}

export function uploadFile(file, userId, courseId) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('user_id', userId);
  formData.append('course_id', courseId);

  return axios
    .post("http://localhost:8080/upload", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(function (result) {
      console.log("Resultado de la subida del archivo: ", result.data);
      return result.data;
    })
    .catch(function (error) {
      console.log("Hubo un Error en la subida del archivo:", error);
      throw error;
    });
}