# Expense Tracker Frontend

This is the **frontend** part of the Expense Tracker application built with **React.js**.  
It allows users to **add**, **edit**, **delete**, and **visualize** their expenses through a simple and responsive interface.

## 🚀 Tech Stack
- React.js
- Axios
- Chart.js (for data visualization)
- CSS (custom styling)

## ✨ Features
- Add new expenses (amount, category, description, date)
- Edit existing expenses
- Delete expenses
- View expense data in charts (Pie Chart and Bar Chart)
- Responsive design
- API communication with backend using Axios

## ⚙️ Setup Instructions

### 1. Clone the repository
git clone https://github.com/your-username/expense-tracker-project.git

### 2. Navigate to the frontend folder

cd expense-tracker-project/frontend


### 3. Install dependencies

npm install

### 4. Create `.env` file
Inside the `frontend` folder, create a `.env` file:

env
REACT_APP_API_URL=http://localhost:5000


### 5. Start the development server

npm start

The application will start at `http://localhost:3000`.

## 🧩 Environment Variables
- `REACT_APP_API_URL` — URL where your backend server is running (important for API calls).

## 📈 Libraries Used
- **Axios** - For making HTTP requests
- **Chart.js** - For creating charts
- **React Router DOM** - (if routing is used)

## 🛠️ Available Scripts
In the project directory, you can run:
- `npm start` — Runs the app in development mode.
- `npm run build` — Builds the app for production.
