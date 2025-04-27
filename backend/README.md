# Expense Tracker Backend

This is the **backend** part of the Expense Tracker application built with **Node.js**, **Express.js**, and **MongoDB**.  
It provides RESTful API endpoints to manage user expenses.

## 🚀 Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- dotenv
- cors

## ✨ Features
- Add a new expense
- Get all expenses
- Update an expense
- Delete an expense
- Secure API endpoints using token authentication (optional if implemented)

## ⚙️ Setup Instructions

### 1. Clone the repository

git clone https://github.com/your-username/expense-tracker-project.git

### 2. Navigate to the backend folder

cd expense-tracker-project/backend

### 3. Install dependencies

npm install

### 4. Create `.env` file

Inside the `backend` folder, 
create a `.env` file:

- PORT=5000
- MONGO_URI= Database connection string
- JWT_SECRET= Secret Key

### 5. Start the server

npm run dev

The server will start at `http://localhost:5000`.

> You need `nodemon` installed globally for `npm run dev` (development mode).

To install nodemon globally:

npm install -g nodemon

## 🧩 API Endpoints

| Method | Endpoint                 | Description              |
| :----- | :------------------------| :----------------------- |
| POST   | /api/exp                 | Add a new expense        |
| GET    | /api/exp                 | Get all expenses         |
| PUT    | /api/exp/:id             | Update an expense        |
| PUT    | /api/exp/delete/:id      | Delete an expense        |
| POST   | /api/user/register       | Register                 |
| POST   | /api/user/login          | Login                    |

## 🛠️ Available Scripts
In the project directory, you can run:
- `npm start` — Runs the app in production mode.
- `npm run dev` — Runs the app in development mode (with nodemon).

## 🗃️ Libraries Used
- **Express** - Web framework
- **Mongoose** - MongoDB ODM
- **dotenv** - Environment variable management
- **cors** - Enable Cross-Origin Resource Sharing