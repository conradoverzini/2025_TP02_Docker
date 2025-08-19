-- Script de inicialización para base de datos de desarrollo
USE courses_dev;

-- Crear tablas básicas si no existen
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('student', 'admin') DEFAULT 'student',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    instructor_id INT,
    price DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (instructor_id) REFERENCES users(id)
);

-- Insertar datos de prueba para desarrollo
INSERT IGNORE INTO users (username, email, password, role) VALUES
('admin_dev', 'admin@dev.com', 'hashed_password', 'admin'),
('student_dev', 'student@dev.com', 'hashed_password', 'student');

INSERT IGNORE INTO courses (title, description, instructor_id, price) VALUES
('Curso de Desarrollo Web', 'Aprende HTML, CSS y JavaScript', 1, 29.99),
('Curso de Docker', 'Introducción a contenedores', 1, 39.99); 