"use client"
import React, { useEffect, useState } from "react";
import { search } from "@/app/utils/axios"; 
import { course } from "../home/page";

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [courses, setCourses] = useState<any[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await search(query); // Llama a la función search del axios.js
      setCourses(response.results);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

{/* useEffect(() => {
    async function fetchCourses() {
      try {
        const data: course[] = await search();
        setCourses(data); 
      } catch (error) {
        console.error("Error encontrando cursos:", error);
      }
    }

    fetchCourses();
  }, []); */}

  return (
    <div className="flex justify-center w-full">
      <div className="SearchBar">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="block w-[500px] p-2 pl-10 focus:border-blue-500 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Busca algún curso..."
            value={query}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <div className="Courses">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="Course">
              <div className="Course-details">
                <h1 className="Course-title">{course.title}</h1>
                <p className="Course-description">{course.description}</p>
                <p className="Course-category">
                  <strong>{course.category}</strong>
                </p>
              </div>
            </div>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default Search;