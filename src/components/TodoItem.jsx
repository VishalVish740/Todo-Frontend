import React from 'react';
import axiosInstance from '../../axiosInstance';
import toast from 'react-hot-toast';

const TodoItem = ({ todo, onDelete, onEdit }) => {
    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/todos/${todo._id}`);
            toast.success('Todo deleted');
            onDelete(todo._id);
        } catch (err) {
            toast.error('Delete failed');
        }
    };

    return (
        <div className="flex justify-between items-center bg-gray-700 p-3 rounded-md mb-2">
            <div>
                <h3 className="text-white font-semibold">{todo.name}</h3>
                <p className="text-gray-400 text-sm">{todo.remark}</p>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => onEdit(todo)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-md text-sm"
                >
                    Edit
                </button>
                <button
                    onClick={handleDelete}
                    className="bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded-md text-sm"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default TodoItem;
