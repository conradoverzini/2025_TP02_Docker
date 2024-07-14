"use client";
import React, { useEffect, useState } from 'react';
import { getCourses } from '@/app/utils/axios'; 
import Curso from '../componentes/Curso';
import Navbar from '../componentes/Navbar'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

export type course = {
  id: number;
  title: string;
  description: string;
  category: string;
  instructor: string;
  duration: number;
  requirement: string;
};

const AdminHome: React.FC = () => {
  const [courses, setCourses] = useState<course[]>([]);

  useEffect(() => {
    async function fetchCourses() {
      try {
        const data: course[] = await getCourses();
        setCourses(data); 
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    }
  
    fetchCourses();
  }, []);

  const handleSearchResults = (results: course[]) => {
    setCourses(results);
  };

  const handleModify = (course_id: number) => {
    console.log('Modificar curso:', course_id);
    // Lógica para modificar el curso
  };

  const handleDelete = (course_id: number) => {
    console.log('Eliminar curso:', course_id);
    // Lógica para eliminar el curso
  };

  const handleAddCourse = () => {
    console.log('Añadir nuevo curso');
    // Lógica para añadir un nuevo curso
  };

  return (
    <>
      <Navbar onSearchResults={handleSearchResults} /> 
      <div className="pt-16 w-full flex flex-col items-center justify-start overflow-y-auto">
        <div className="flex justify-center mt-8 mb-2">
          <button
            onClick={handleAddCourse}
            className="bg-blue-500 text-white px-10 py-4 rounded-lg text-xl font-bold hover:bg-blue-600"
          >
            Añadir nuevo curso
          </button>
        </div>
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Curso
                key={course.id}
                id={course.id}
                title={course.title}
                description={course.description}
                category={course.category}
                instructor={course.instructor}
                duration={course.duration}
                requirement={course.requirement}
                handleModify={handleModify}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-screen">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-500 text-6xl mb-4" />
            <p className="text-white text-4xl">No se encontraron cursos</p>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminHome;
