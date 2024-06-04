"use client"
import React from 'react';
import { useState } from 'react';

type CourseProps = {
  title: string;
  description: string;
  category: string;
  instructor: string;
  duration: number;
  requirement: string;
};

const Curso: React.FC<CourseProps> = ({
  title,
  description,
  category,
  instructor,
  duration,
  requirement,


}) => {
    const [courses, setCourses] = useState([]);
    const [query, setQuery] = useState('');
    
  


  return (
    <div className="max-w-md mx-auto my-8 bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{category}</div>
          <h2 className="block mt-1 text-lg leading-tight font-medium text-black">{title}</h2>
          <p className="mt-2 text-gray-500">{description}</p>
          <div className="mt-4">
            <span className="text-gray-700 font-semibold">Instructor:</span> {instructor}
          </div>
          <div className="mt-2">
            <span className="text-gray-700 font-semibold">Duración:</span> {duration} horas
          </div>
          <div className="mt-2">
            <span className="text-gray-700 font-semibold">Requisitos:</span> {requirement}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curso;