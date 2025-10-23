import React, { useState } from 'react';
import axiosInstance from '../../axiosInstance';
import toast, { Toaster } from 'react-hot-toast';

const getTodayDateString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

const TodoForm = ({ onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        remark: '',
        completed: false,
        dueDate: getTodayDateString(),
        priority: 'Medium',
    });
    const [mode, setMode] = useState('Add');
    const [disabled, setDisabled] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) {
            toast.error('Task name is required');
            return;
        }

        const todoData = {
            ...formData,
            dueDate: formData.dueDate ? new Date(formData.dueDate) : null
        };

        try {
            const response = await axiosInstance.post('/todos', todoData);
            toast.success('Todo added successfully!');

            onAdd && onAdd(response.data);

            setFormData({
                name: '',
                remark: '',
                completed: false,
                dueDate: '',
                priority: 'Medium',
            });
        } catch (error) {
            const message = error?.response?.data?.error || error.message || 'Something went wrong';
            toast.error(`Error adding todo: ${message}`);
            console.error(error);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-lg space-y-4"
        >
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
                    Task Name *
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter task name"
                    className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
            </div>

            <div>
                <label htmlFor="remark" className="block text-sm font-medium text-white mb-1">
                    Remark
                </label>
                <input
                    type="text"
                    name="remark"
                    id="remark"
                    value={formData.remark}
                    onChange={handleChange}
                    placeholder="Optional remarks"
                    className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white placeholder-gray-400"
                />
            </div>

            <div className="flex items-center space-x-2">
                <input
                    type="checkbox"
                    name="completed"
                    id="completed"
                    checked={formData.completed}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="completed" className="text-white text-sm">
                    Mark as Completed
                </label>
            </div>

            <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-white mb-1">
                    Due Date
                </label>
                <input
                    type="date"
                    name="dueDate"
                    id="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white"
                />
            </div>

            <div>
                <label htmlFor="priority" className="block text-sm font-medium text-white mb-1">
                    Priority
                </label>
                <select
                    name="priority"
                    id="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white"
                >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
            </div>

            <div className="flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={mode !== 'Add'}
                    className={`flex-1 rounded-md py-2 text-white transition ${mode === 'Add'
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-green-900 opacity-50 cursor-not-allowed'
                        }`}
                >
                    Add
                </button>

                <button
                    type="button"
                    onClick={() => setMode('Read')}
                    disabled={mode !== 'Read'}
                    className={`flex-1 rounded-md py-2 text-white transition ${mode === 'Read'
                        ? 'bg-blue-600 hover:bg-blue-700'
                        : 'bg-blue-900 opacity-50 cursor-not-allowed'
                        }`}
                >
                    Read
                </button>
            </div>
        </form>
    );
};

export default TodoForm;
