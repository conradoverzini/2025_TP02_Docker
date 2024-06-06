"use client"
import React, { useEffect, useState } from 'react';
import { getCourses } from '@/app/utils/axios'; // Asegúrate de que la ruta sea correcta
import Curso from '../componentes/Curso';
import Navbar from '../componentes/Navbar'; // Importa el navbar

export type course = {
  id: number;
  title: string;
  description: string;
  category: string;
  instructor: string;
  duration: number;
  requirement: string;
};

export default function Home() {
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

  return (
    <div className="w-full min-h-screen bg-gray-800">
      <Navbar onSearchResults={handleSearchResults} /> {/* Renderiza el navbar y pasa la función de búsqueda */}
      <div className="pt-16 w-full flex flex-col items-center justify-start overflow-y-auto">
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
              />
            ))}
          </div>
        ) : (
          <p className="text-white">No se encontraron cursos!</p>
        )}
      </div>
    </div>
  );
}

