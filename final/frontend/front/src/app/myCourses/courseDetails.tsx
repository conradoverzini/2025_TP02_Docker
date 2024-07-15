import React, { useEffect, useState } from 'react';
import Navbar from '@/app/componentes/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import { commentsList, addComment, getCourses, getUserId, userAuthentication } from '@/app/utils/axios'; 
import CourseDataReadOnly from '@/app/componentes/courseDataReadOnly';

export type CourseDetails = {
  id: number;
  title: string;
  description: string;
  category: string;
  instructor: string;
  duration: number;
  requirement: string;
};

export type CommentResponse = {
  userID: string;
  comment: string;
};

const CourseDetailsPage: React.FC<{ courses: CourseDetails[] }> = ({ courses }) => {
  const router = useRouter();
  const { courseId } = router.query;
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null); // Estado para almacenar el ID de usuario

  useEffect(() => {
    // Función para obtener el ID de usuario
    const fetchUserId = async () => {
      try {
        const token = localStorage.getItem('accessToken'); // Aquí asumo que tienes un token almacenado en localStorage
        if (token) {
          await userAuthentication(token); // Realiza la autenticación del usuario
          const id = await getUserId(token); // Obtiene el ID de usuario
          setUserId(id); // Guarda el ID de usuario en el estado
        }
      } catch (error) {
        console.error('Error fetching user ID:', error);
        // Manejo de errores según tu aplicación
      }
    };

    fetchUserId(); // Llama a la función para obtener el ID de usuario al cargar el componente
    console.log(userId);
  }, []);

  useEffect(() => {
    const fetchCourseDetails = () => {
      setLoading(true);
      try {
        const course = courses.find((c) => c.id === Number(courseId));
        setCourseDetails(course || null);
      } catch (error) {
        setError("Error finding course details");
      } finally {
        setLoading(false);
      }
    };

    const fetchComments = async () => {
      try {
        const commentsData = await commentsList(Number(courseId));
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    if (courseId) {
      fetchCourseDetails();
      fetchComments();
    }
  }, [courseId, courses]);

  const handleAddComment = async () => {
    try {
      if (!userId) {
        throw new Error('User ID not available'); // Manejar el caso en el que el ID de usuario no esté disponible
      }

      const commentRequest = {
        userID: userId,
        courseID: Number(courseId),
        comment: newComment,
      };
      await addComment(commentRequest);
      const updatedComments = await commentsList(Number(courseId));
      setComments(updatedComments);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
      // Manejo de errores según tu aplicación
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error || !courseDetails) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 text-6xl mb-4" />
        <p className="text-white text-4xl">Error: No se encontraron detalles del curso.</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-800">
      <Navbar onSearchResults={(courses: any[]) => {}} />
      <div className="pt-16 w-full flex flex-col items-center justify-start overflow-y-auto">
        <CourseDataReadOnly initialData={courseDetails} />
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md w-full max-w-3xl">
          <h2 className="text-2xl font-bold mb-4">Comentarios</h2>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="mb-4">
                <p className="text-gray-800">{comment.comment}</p>
                <p className="text-gray-600">Usuario: {comment.userID}</p>
                <hr className="my-2" />
              </div>
            ))
          ) : (
            <p>No hay comentarios disponibles.</p>
          )}
          <div className="mt-4">
            <textarea
              className="w-full p-2 border rounded"
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario..."
            ></textarea>
            <button
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleAddComment}
            >
              Agregar Comentario
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
