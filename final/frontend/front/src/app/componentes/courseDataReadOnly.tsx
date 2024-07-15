

import React from 'react';

type CourseDataReadOnlyProps = {
  initialData: {
    title: string;
    description: string;
    category: string;
    instructor: string;
    duration: number;
    requirement: string;
  };
};

const CourseDataReadOnly: React.FC<CourseDataReadOnlyProps> = ({ initialData }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-3xl">
      <h1 className="text-3xl font-bold mb-2">{initialData.title}</h1>
      <p className="text-gray-600 mb-4">{initialData.description}</p>
      <p className="text-gray-700 mb-2">Category: {initialData.category}</p>
      <p className="text-gray-700 mb-2">Instructor: {initialData.instructor}</p>
      <p className="text-gray-700 mb-2">Duration: {initialData.duration} hours</p>
      <p className="text-gray-700 mb-2">Requirement: {initialData.requirement}</p>
    </div>
  );
};

export default CourseDataReadOnly;
