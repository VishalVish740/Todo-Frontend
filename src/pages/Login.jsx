import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance';
import toast, { Toaster } from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

const Login = ({ setShowSignup, setIsLoggedIn, setShowForgot }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axiosInstance.post('/users/login', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data));
            toast.success('Login successful! Welcome back');
            setTimeout(() => setIsLoggedIn(true), 1200);
        } catch (err) {
            const message = err.response?.data?.message || 'Invalid credentials';
            toast.error(message);
        } finally {
            setLoading(false);
            setPassword('');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black px-4 sm:px-0">
            <Toaster position="top-right" reverseOrder={false} />
            <form
                onSubmit={handleLogin}
                className="w-full max-w-sm sm:max-w-md bg-gray-800 bg-opacity-90 p-8 sm:p-10 rounded-2xl shadow-2xl transform transition-all hover:scale-[1.02]"
            >
                <h2 className="text-3xl font-bold text-center text-white mb-3 tracking-wide">
                    Welcome Back
                </h2>
                <p className="text-gray-400 text-center mb-6 text-sm sm:text-base">
                    Please log in to continue managing your tasks
                </p>

                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 sm:py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400 transition-all text-sm sm:text-base"
                        required
                    />
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg"
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-3 flex items-center"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`mt-6 w-full py-3 rounded-lg text-white font-semibold transition-all duration-300 ${loading
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
                        }`}
                >
                    {loading ? 'Logging in...' : 'Login'}
                </button>

                <p className="text-gray-400 text-center mt-4 text-sm">
                    Don’t have an account?{' '}
                    <span
                        className="text-blue-400 hover:text-blue-300 cursor-pointer font-medium"
                        onClick={() => setShowSignup(true)}
                    >
                        Sign up
                    </span>
                </p>

                <p className="text-gray-400 text-center mt-2 text-sm">
                    Forgot your password?{' '}
                    <span
                        className="text-blue-400 hover:text-blue-300 cursor-pointer font-medium"
                        onClick={() => setShowForgot(true)}
                    >
                        Reset
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
