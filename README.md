# Task Manager App

## Project Overview
The Task Manager App is a modern, responsive web application for managing personal tasks. Users can sign up, log in, reset passwords, and perform full CRUD operations on tasks. The project combines a React frontend with a Node.js/MongoDB backend and secure JWT authentication.

## Technologies Used

**Frontend:**  
- React with Hooks  
- Tailwind CSS for styling  
- react-hot-toast for notifications  

**Backend:**  
- Node.js and Express.js  
- MongoDB with Mongoose  
- JWT for authentication and authorization  

**Communication:**  
- Axios for API requests  

**State Management:**  
- React `useState` and props  

**Other Features:**  
- Local storage for storing JWT token and user data  
- Responsive and interactive UI  

## Components & Features

### 1. Signup Component
- Allows new users to create an account with username, email, and password.  
- Shows success/error messages using react-hot-toast.  
- Redirects to the login page on successful signup.  
- Clean and responsive design using Tailwind CSS.  

### 2. Login Component
- Allows existing users to log in using email and password.  
- Stores JWT token and user data in localStorage.  
- Redirects logged-in users to the main dashboard.  
- Provides links to Sign Up and Forgot Password pages.  

### 3. Forgot Password Component
- Allows users to reset their password.  
- Users enter email, new password, and confirm password.  
- Shows success/error messages and redirects to login on success.  

### 4. Task Management Component
- Perform full **CRUD operations**:  
  - **Create:** Add new tasks with title and description  
  - **Read:** View all tasks in a list  
  - **Update:** Edit task details  
  - **Delete:** Remove tasks permanently  
- Real-time updates reflected in UI  
- Clean and responsive interface for task management  

## API Integration
- **POST /users/signup** → Register a new user  
- **POST /users/login** → Log in a user  
- **POST /users/forgot-password** → Reset password  
- **GET /tasks** → Fetch all tasks for the logged-in user  
- **POST /tasks** → Create a new task  
- **PUT /tasks/:id** → Update a task by ID  
- **DELETE /tasks/:id** → Delete a task by ID  

## Usage Flow

1. **Sign Up** → **Create** a new account with username, email, and password.  
2. **Login** → **Authenticate** using your email and password to access the dashboard.  
3. **Forgot Password** → **Reset** your password if forgotten.  
4. **Task Management** → **Create, view, edit, delete** tasks in your dashboard.  
5. **Logout** → **Clear** the token and return to the login page.  

## Future Enhancements
- Role-based access and permissions  
- Drag-and-drop task organization  
- Email notifications for deadlines and reminders  
- Advanced filtering and search for tasks  

## Conclusion
This project demonstrates a full authentication and task management flow with reusable React components, modern React best practices, and a clean, responsive UI. The architecture supports easy expansion for additional features and improved UX.
