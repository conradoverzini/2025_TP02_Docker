-- Script de inicialización para base de datos de QA
USE courses_qa;

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

-- Insertar datos de prueba para QA
INSERT IGNORE INTO users (username, email, password, role) VALUES
('admin_qa', 'admin@qa.com', 'hashed_password', 'admin'),
('student_qa', 'student@qa.com', 'hashed_password', 'student'),
('tester_qa', 'tester@qa.com', 'hashed_password', 'student');

INSERT IGNORE INTO courses (title, description, instructor_id, price) VALUES
('Curso de Testing', 'Aprende testing automatizado', 1, 49.99),
('Curso de DevOps', 'Introducción a CI/CD', 1, 59.99),
('Curso de QA', 'Fundamentos de Quality Assurance', 1, 44.99); 