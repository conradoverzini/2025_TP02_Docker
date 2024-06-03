import React from "react";

function Search() {
  return (
    <div className="flex justify-center w-full"> 
      <input
        type="search"
        id="search"
        className={`block w-[500px] p-2 pl-10 focus:border-blue-500
            dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500 className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"`}
        placeholder="Buscar..."
      />
    </div>
  );
}

export default Search;
