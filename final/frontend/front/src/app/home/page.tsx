"use client";
import React, { useEffect, useState } from 'react';
import { userAuthentication } from '@/app/utils/axios';
import StudentHome from '@/app/componentes/StudentHome';
import AdminHome from '../componentes/AdminHome';

export default function Home() {
  const [role, setRole] = useState<string>();

  useEffect(() => {
    async function fetchUserType() {
      try {
        const token = localStorage.getItem('token');
        console.log(token); 
        if (token) {
          const userType = await userAuthentication(token);
          console.log(userType); 
          setRole(userType); 
        }
      } catch (error) {
        console.error("Error fetching user type:", error);
      }
    }
  
    fetchUserType();
  }, []);

  return (
    <div className="w-full min-h-screen bg-gray-800">
      {role === "student" ? (
        <StudentHome />
      ) : (
        <AdminHome /> 
      )}
    </div>
  );
}
