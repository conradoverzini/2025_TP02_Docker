"use client"
import React, { useEffect, useState } from 'react';
import Navbar from '../componentes/Navbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCourseById } from '../utils/axios';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';

type Course = {
  id: number;
  title: string;
  description: string;
  category: string;
  instructor: string;
  duration: number;
  requirement: string;
};

export default function CourseDetails() {
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourse() {
      const id = localStorage.getItem('CourseId'); 
      if(id){
        const courseId = parseInt(id, 10); 
        try {
          const data = await getCourseById(courseId);
          setCourse(data);
        } catch (error) {
            setError('Error fetching course data.');
            console.error("Error fetching course:", error);
          }
        } 
      }
  
      fetchCourse();
    }, []);

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p className="text-white text-4xl">Cargando...</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-800 text-white">
      <Navbar onSearchResults={(): void => { /* Implement search handling here */}} /> 
      <div className="pt-16 w-full flex flex-col items-center justify-start overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-8xl font-bold mb-6">{course.title}</h1>
        <p className="text-white text-3xl mb-4">{course.description}</p>
        <p className="text-white text-1xl mb-4"><span className="font-semibold">Categoría:</span> {course.category}</p>
        <p className="text-white text-1xl mb-4"><span className="font-semibold">Instructor:</span> {course.instructor}</p>
        <p className="text-white text-1xl mb-4"><span className="font-semibold">Duración:</span> {course.duration} semanas</p>
        <p className="text-white text-1xl mb-4"><span className="font-semibold">Requisitos:</span> {course.requirement}</p>
      </div>
      </div>
    </div>
  );
}
