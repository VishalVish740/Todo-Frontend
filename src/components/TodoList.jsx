import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import toast from 'react-hot-toast';
import {
    TrashIcon,
    PencilSquareIcon,
    CheckIcon,
    XMarkIcon,
} from '@heroicons/react/24/solid';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingTodo, setEditingTodo] = useState(null);
    const [editForm, setEditForm] = useState({
        name: '',
        remark: '',
        priority: 'Medium',
        dueDate: '',
    });

    // Fetch all todos
    const fetchTodos = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/todos');
            const data = response.data;
            const todosArray = Array.isArray(data.todos) ? data.todos : [];
            setTodos(todosArray);
        } catch (error) {
            const message =
                error?.response?.data?.error || error.message || 'Error fetching todos';
            toast.error(message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    // Delete Todo
    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this todo?')) return;
        try {
            await axiosInstance.delete(`/todos/${id}`);
            toast.success('Todo deleted successfully!');
            setTodos(todos.filter((t) => t._id !== id));
        } catch (error) {
            toast.error('Error deleting todo');
        }
    };

    // Start Editing
    const handleEditStart = (todo) => {
        setEditingTodo(todo._id);
        setEditForm({
            name: todo.name,
            remark: todo.remark || '',
            priority: todo.priority,
            dueDate: todo.dueDate ? todo.dueDate.split('T')[0] : '',
        });
    };

    // Handle Edit Form Change
    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    // Save Edited Todo
    const handleEditSave = async (id) => {
        try {
            await axiosInstance.put(`/todos/${id}`, editForm);
            toast.success('Todo updated!');
            setEditingTodo(null);
            fetchTodos();
        } catch (error) {
            toast.error('Error updating todo');
        }
    };

    // Cancel Editing
    const handleEditCancel = () => {
        setEditingTodo(null);
    };

    return (
        <div className="w-full max-w-2xl mx-auto mt-6 bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 border-b border-gray-700 pb-2">
                📋 Your Todos
            </h2>

            {loading ? (
                <p className="text-gray-400 text-center">Loading...</p>
            ) : todos.length === 0 ? (
                <p className="text-gray-400 text-center">No todos yet. Add one above!</p>
            ) : (
                <div className="max-h-80 sm:max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                    <ul className="space-y-3">
                        {todos.map((todo) => (
                            <li
                                key={todo._id}
                                className={`p-3 rounded-md border ${todo.completed
                                    ? 'bg-green-700 border-green-600'
                                    : 'bg-gray-700 border-gray-600'
                                    }`}
                            >
                                {editingTodo === todo._id ? (
                                    // Edit Mode
                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            name="name"
                                            value={editForm.name}
                                            onChange={handleEditChange}
                                            className="w-full bg-gray-600 text-white p-2 rounded"
                                            placeholder="Task name"
                                        />
                                        <input
                                            type="text"
                                            name="remark"
                                            value={editForm.remark}
                                            onChange={handleEditChange}
                                            className="w-full bg-gray-600 text-white p-2 rounded"
                                            placeholder="Remark"
                                        />
                                        <div className="flex flex-col sm:flex-row gap-2">
                                            <select
                                                name="priority"
                                                value={editForm.priority}
                                                onChange={handleEditChange}
                                                className="bg-gray-600 text-white p-2 rounded flex-1"
                                            >
                                                <option value="Low">Low</option>
                                                <option value="Medium">Medium</option>
                                                <option value="High">High</option>
                                            </select>
                                            <input
                                                type="date"
                                                name="dueDate"
                                                value={editForm.dueDate}
                                                onChange={handleEditChange}
                                                className="bg-gray-600 text-white p-2 rounded flex-1"
                                            />
                                        </div>

                                        {/* Save & Cancel Icons */}
                                        <div className="flex justify-end gap-3 mt-3">
                                            <button
                                                onClick={() => handleEditSave(todo._id)}
                                                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full text-green-400 hover:text-green-300 transition"
                                                title="Save"
                                            >
                                                <CheckIcon className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={handleEditCancel}
                                                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full text-gray-400 hover:text-gray-300 transition"
                                                title="Cancel"
                                            >
                                                <XMarkIcon className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3
                                                    className={`text-lg font-medium ${todo.completed
                                                        ? 'text-gray-300 line-through'
                                                        : 'text-white'
                                                        }`}
                                                >
                                                    {todo.name}
                                                </h3>
                                                {todo.remark && (
                                                    <p className="text-sm text-gray-400 mt-1">
                                                        {todo.remark}
                                                    </p>
                                                )}
                                            </div>

                                            <span
                                                className={`px-2 py-1 rounded text-xs font-semibold ${todo.priority === 'High'
                                                    ? 'bg-red-600 text-white'
                                                    : todo.priority === 'Medium'
                                                        ? 'bg-yellow-500 text-black'
                                                        : 'bg-green-500 text-black'
                                                    }`}
                                            >
                                                {todo.priority}
                                            </span>
                                        </div>

                                        {todo.dueDate && (
                                            <div className="flex justify-between items-center ">
                                                <p className="text-xs text-gray-400">
                                                    Due: {new Date(todo.dueDate).toLocaleDateString()}
                                                </p>

                                                {/* Edit & Delete Icons next to due date */}
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => handleEditStart(todo)}
                                                        className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full text-blue-400 hover:text-blue-300 transition"
                                                        title="Edit"
                                                    >
                                                        <PencilSquareIcon className="w-5 h-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(todo._id)}
                                                        className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full text-red-400 hover:text-red-300 transition"
                                                        title="Delete"
                                                    >
                                                        <TrashIcon className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default TodoList;
