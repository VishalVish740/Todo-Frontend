import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance';
import toast, { Toaster } from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid';

const Signup = ({ setShowSignup }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axiosInstance.post('/users/signup', {
                username,
                email,
                password,
            });

            toast.success(data.message || 'Account created successfully! Please login.');
            setTimeout(() => setShowSignup(false), 1500);
        } catch (err) {
            const errorMsg = err.response?.data?.message || 'Signup failed';
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black px-4 sm:px-0">
            <Toaster position="top-right" reverseOrder={false} />

            <form
                onSubmit={handleSignup}
                className="bg-gray-800 bg-opacity-90 p-8 sm:p-10 rounded-2xl shadow-2xl w-full max-w-sm transform transition-all hover:scale-[1.02]"
            >
                <h2 className="text-3xl font-bold text-center text-white mb-3 tracking-wide">
                    Create Account
                </h2>
                <p className="text-gray-400 text-center mb-8 text-sm">
                    Manage your tasks efficiently
                </p>

                <div className="space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 transition-all"
                        required
                    />

                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 transition-all"
                        required
                    />
                    <div className="relative">

                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400 transition-all"
                            required
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
                    className={`mt-6 w-full py-2 rounded-lg text-white font-semibold transition-all duration-300 ${loading
                        ? 'bg-green-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 hover:shadow-lg'
                        }`}
                >
                    {loading ? 'Creating Account...' : 'Sign Up'}
                </button>

                <p className="text-gray-400 text-center mt-4 text-sm">
                    Already have an account?{' '}
                    <span
                        className="text-blue-400 hover:text-blue-300 cursor-pointer font-medium"
                        onClick={() => setShowSignup(false)}
                    >
                        Log in
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Signup;
