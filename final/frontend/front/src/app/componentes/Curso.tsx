import React from 'react';

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
  return (
    <div className="max-w-md mx-auto my-8 bg-gray-300 rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="p-8 w-full">
          <div className="text-center">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {category}
            </div>
            <h2 className="block mt-1 text-2xl leading-tight font-medium text-black">
              {title}
            </h2>
          </div>
          <p className="mt-4 text-gray-600 text-center">{description}</p>
          <div className="mt-4 text-center">
            <span className="text-gray-700 font-semibold">Instructor:</span>{' '}
            {instructor}
          </div>
          <div className="mt-2 text-center">
            <span className="text-gray-700 font-semibold">Duración:</span>{' '}
            {duration} Semanas
          </div>
          <div className="mt-2 text-center">
            <span className="text-gray-700 font-semibold">Requisitos:</span>{' '}
            {requirement}
          </div>
          <div className="flex justify-center mt-6">
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
              Inscripción
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Curso;