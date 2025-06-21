# MERN Authentication Project

This is a simple MERN (MongoDB, Express, React, Node.js) stack application with authentication features.

## Features

- User registration
- User login
- Protected routes
- JWT authentication

## Project Structure

```
├── backend/                  # Express.js server
│   ├── middleware/           # Authentication middleware
│   ├── models/               # MongoDB models
│   ├── routes/               # API routes
│   └── server.js             # Server entry point
└── frontend/                 # React client
    ├── public/               # Static files
    └── src/                  # React source code
        ├── components/       # Reusable components
        ├── context/          # Context API
        ├── pages/            # Page components
        └── App.js            # Main component
```

## Getting Started

### Prerequisites

- Node.js
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

### Configuration

Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern_auth
JWT_SECRET=your_jwt_secret_key
```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```
   cd frontend
   npm start
   ```

3. Open your browser and go to `http://localhost:3000`

## Screens

1. **Login Screen** - User authentication
2. **Registration Screen** - New user registration
3. **Dashboard** - Protected blank screen for authenticated users
