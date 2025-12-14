# Social Media App (React + Bootstrap)

A simple social media web application built using *React, **Bootstrap, and **REST APIs*.  
The app allows users to register, log in, create posts, like and comment on posts, follow/unfollow users, and view user profiles.

---

## Features

- User Signup & Login
- Home Feed
- Create Post
- Like / Unlike Posts
- Comment on Posts
- Follow / Unfollow Users
- User Profile Page
- Mobile Responsive UI

---

## Tech Stack

### Frontend
- React
- React Router DOM
- Bootstrap 5
- Axios

### Backend
- Node.js
- Express.js
- MongoDB

> Backend is used as an API service and is not included in this repository.

---

## Authentication

- JWT token and user ID are stored in localStorage after login
- Logout clears the stored data

---

## API Endpoints Used

### Authentication
- POST /auth/signup
- POST /auth/login

### Posts
- GET /posts/feed
- POST /posts/create
- POST /posts/:id/like
- GET /posts/:id
- POST /posts/:id/comment

### Users
- GET /users/allusers
- GET /users/:id/profile
- POST /users/:id/follow
- POST /users/:id/unfollow

---

## How to Run the Project

1. Install dependencies


2. Start the development server


> Make sure the backend server is running and the API base URL is correctly set in services/api.js.

---

## UI & Styling

- Bootstrap-based layout
- Minimal custom CSS
- Fully responsive design

---

## Future Improvements

- Profile image upload
- Post image upload
- Notifications
- Search users
- Improved error handling

---

## Author

Developed as a Social Media Application using the MERN stack.# INSTAGRAM-MINI
