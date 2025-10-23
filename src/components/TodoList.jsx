import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosInstance';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import toast from 'react-hot-toast';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [selectedTodo, setSelectedTodo] = useState(null);

    const fetchTodos = async () => {
        try {
            const res = await axiosInstance.get('/todos');
            setTodos(res.data);
        } catch (error) {
            toast.error('Failed to load todos');
        }
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    const handleAdd = (newTodo) => setTodos(prev => [...prev, newTodo]);
    const handleUpdate = (updatedTodo) => {
        setTodos(prev =>
            prev.map(todo => (todo._id === updatedTodo._id ? updatedTodo : todo))
        );
    };
    const handleDelete = (id) => setTodos(prev => prev.filter(todo => todo._id !== id));

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-4">
            <TodoForm
                selectedTodo={selectedTodo}
                onAdd={handleAdd}
                onUpdate={handleUpdate}
                clearSelection={() => setSelectedTodo(null)}
            />

            <div className="mt-6">
                {todos.map(todo => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        onDelete={handleDelete}
                        onEdit={setSelectedTodo}
                    />
                ))}
            </div>
        </div>
    );
};

export default TodoList;
