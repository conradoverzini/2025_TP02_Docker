import React from "react";
import Search from "./Search";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 duration-300 h-16 flex items-center p-3 z-10">
      <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Icono a la izquierda */}
        <div className="flex items-center">
          <Link href={"/"}>
            <FontAwesomeIcon 
              icon={faBars} 
              className="text-gray-900 bg-indigo-500 rounded-full p-2" 
            />
          </Link>
        </div>
        <div className="flex-1 mx-4 flex justify-center">
          <Search />
        </div>
        {/* Espacio para iconos de usuario a la derecha */}
        <div className="flex items-center">
          {/* Aquí colocarías los iconos de usuario */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
