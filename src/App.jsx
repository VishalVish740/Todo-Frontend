import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPass from './pages/ForgetPass';

const App = () => {
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showSignup, setShowSignup] = useState(false);
  const [showForgot, setShowForgot] = useState(false);

  const handleTodoAdded = () => setRefreshFlag(prev => !prev);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    if (showForgot) {
      return <ForgotPass setShowLogin={() => setShowForgot(false)} />;
    }

    return showSignup ? (
      <Signup setShowSignup={setShowSignup} setIsLoggedIn={setIsLoggedIn} />
    ) : (
      <Login
        setShowSignup={setShowSignup}
        setIsLoggedIn={setIsLoggedIn}
        setShowForgot={setShowForgot}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center py-8 px-4 sm:px-6">
      <div className="w-full max-w-2xl flex justify-end mb-4">
        <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded text-white">
          Logout
        </button>
      </div>
      <TodoForm onAdd={handleTodoAdded} />
      <TodoList key={refreshFlag} />
    </div>
  );
};

export default App;
