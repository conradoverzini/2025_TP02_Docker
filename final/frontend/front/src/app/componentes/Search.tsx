"use client"
import { Url } from "next/dist/shared/lib/router/router";
import React, { useEffect, useState } from "react";

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [courses, setCourses] = useState<any[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(`Current query: ${e.target.value}`);
    setQuery(e.target.value); // Cambiar el estado del buscador mientras se escribe
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission
    setSearch(query); // Update the search state with the current query value
  };

  useEffect(() => {
    if (search !== '') {
      console.log(`Fetching data from http://localhost:8080/courses/search`);
      fetch(`http://localhost:8080/courses/search?query=${search}`)
        .then(response => response.json())
        .then(data => setCourses(data.results))
        .catch(error => console.error('Error fetching courses:', error));
    }
  }, [search]);

  type CourseProps = {
    title: string;
    img_url: Url,
    description: string;
    category: string;
    instructor: string;
    duration: number;
    requirement: string;
  };
  

  return (
    <div className="flex justify-center w-full"> 
      <div className="SearchBar">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="block w-[500px] p-2 pl-10 focus:border-blue-500
            dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Busca algun curso..."
            value={query}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <div className="Courses">
        {courses != null ? (
          courses.map(course => (
            <div key={course.id} className="Course">
              <img src={course.image_url} alt={course.title} className="Course-image" />
              <div className="Course-details">
                <h1 className="Course-title">{course.title}</h1>
                <p className="Course-description">{course.description}</p>
                <p className="Course-category"><strong>{course.category}</strong></p>
              </div>
            </div>
          ))
        ) : (
          <p>Loading courses...</p>
        )}
      </div>
    </div>
  );
};

export default Search;
