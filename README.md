# hrms-system

HRMS – Human Resource Management System

A full-stack HRMS application built using React (Frontend) and Node.js + Express + SQLite (Backend).
This system allows admin users to manage employees, teams, tasks, and authentication.


---

⭐ Features

🔐 Authentication

User Registration

User Login

JWT-based authentication

Protected backend routes


👥 Employee Management

Add Employee

View Employees List

Update Employee (Optional)

Delete Employee (Optional)


👨‍👩‍👧 Team Management

Create Team

View All Teams

Assign Employees to Teams


📝 Task Assignment

Assign tasks to employees

View all assigned tasks


📊 Dashboard

Quick overview of total employees, teams, tasks

Basic user-friendly UI



---

🛠️ Tech Stack

Frontend

React JS

React Router DOM

CSS / Inline Styles

Fetch API

React Hot Toast (notifications)


Backend

Node.js

Express.js

SQLite

Sequelize ORM

JWT Authentication

bcrypt password hashing



---

📁 Project Structure

HRMS/
│── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/db.js
│   ├── index.js
│   └── database.sqlite
│
│── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── README.md


---

🚀 How To Run the Project

1. Clone the Repository

git clone https://github.com/poojitha-creater/hrms-system.git


---

Backend Setup

2. Install Dependencies

cd backend
npm install

3. Start Backend Server

npm run dev

Backend runs on
👉 http://localhost:4000


---

Frontend Setup

4. Install Dependencies

cd ../frontend
npm install

5. Start Frontend App

npm run dev

Frontend opens on
👉 http://localhost:5173


---

🔗 API Endpoints

Auth

POST /auth/register
POST /auth/login

Employees

GET /employees
POST /employees

Teams

GET /teams
POST /teams

Assign Tasks

POST /assign
GET /assign


---

🎯 Future Enhancements

Employee Profile Page

Update / Edit Features

Upload employee photos

Role-based admin access

Leave management system



---

👩‍💻 Author

Bomma Poojitha
GitHub: https://github.com/poojitha-creater


