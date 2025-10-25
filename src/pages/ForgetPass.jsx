import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance';
import toast, { Toaster } from 'react-hot-toast';

const ForgotPass = ({ setShowLogin }) => {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleReset = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (newPassword !== confirmPassword) {
            toast.error('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const { data } = await axiosInstance.post('/users/forgot-password', { email, newPassword });
            toast.success(data.message);
            setTimeout(() => setShowLogin(true), 1500); // redirect to login
        } catch (err) {
            const message = err.response?.data?.message || 'Reset failed';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black px-4">
            <Toaster position="top-right" />
            <form
                onSubmit={handleReset}
                className="bg-gray-800 bg-opacity-90 p-8 rounded-2xl shadow-2xl w-full max-w-sm"
            >
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Reset Password</h2>
                <div className="space-y-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className={`mt-6 w-full py-2 rounded-lg text-white font-semibold ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {loading ? 'Resetting...' : 'Reset Password'}
                </button>
                <p className="text-gray-400 mt-4 text-center">
                    Remember your password?{' '}
                    <span
                        className="text-blue-400 hover:text-blue-300 cursor-pointer"
                        onClick={() => setShowLogin(true)}
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
};

export default ForgotPass;
