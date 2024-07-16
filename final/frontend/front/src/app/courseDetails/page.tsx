"use client"
import React, { useEffect, useState } from 'react';
import Navbar from '../componentes/Navbar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addComment, commentsList, getCourseById } from '../utils/axios';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

type Course = {
  id: number;
  title: string;
  description: string;
  category: string;
  instructor: string;
  duration: number;
  requirement: string;
};

type Comment = {
  userId: number;
  comment: string;
};

export default function CourseDetails() {
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>('');

  useEffect(() => {
    async function fetchCourse() {
      const id = localStorage.getItem('CourseId'); 
      if(id){
        const courseId = parseInt(id, 10); 
        try {
          const data = await getCourseById(courseId);
          setCourse(data);
          fetchComments(courseId);
        } catch (error) {
          setError('Error fetching course data.');
          console.error("Error fetching course:", error);
        }
      } 
    }
  
    fetchCourse();
  }, []);

  async function fetchComments(courseId: number) {
    try {
      const response = await commentsList(courseId);
      setComments(response);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  async function handleAddComment() {
    const user_id = localStorage.getItem('userId');
    if(user_id){
        const userId = parseInt(user_id, 10); 
        const commentRequest = {
            courseID: course!.id,
            userID: userId,
            comment: newComment
        };
    
        try {
        await addComment(commentRequest);
        fetchComments(course!.id);
        setNewComment('');
        } catch (error) {
        console.error("Error adding comment:", error);
        }
    }
  }

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

        <div className="container mx-auto px-4 py-8">
          <h2 className="text-3xl font-bold mb-4">Comentarios</h2>
          <div className="mb-4">
            {comments.length === 0 && (
              <p className="text-white">No hay comentarios aún.</p>
            )}
            {comments.map(comment => (
              <div key={comment.userId} className="bg-gray-700 p-4 rounded-lg mb-4">
                <p className="text-white">{comment.comment}</p>
              </div>
            ))}
          </div>

          <div className="mb-8">
            <textarea
              className="w-full bg-gray-700 text-white p-2 rounded"
              placeholder="Añade un comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={handleAddComment}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
            >
              Comentar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
