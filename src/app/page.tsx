"use client";
import React, { useState, useRef } from "react";
import { m_p_d } from "../lib/globalVariabale";

const DraggableTodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, text: "Complete project documentation", completed: false },
    { id: 2, text: "Review code changes", completed: false },
    { id: 3, text: "Update dependencies", completed: true },
    { id: 4, text: "Fix responsive design issues", completed: false },
    { id: 5, text: "Deploy to production", completed: false },
  ]);

  const [newTodo, setNewTodo] = useState("");
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);

  const dragCounter = useRef(0);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo,
          completed: false,
        },
      ]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDragStart = (e, item) => {
    setDraggedItem(item);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target.outerHTML);
    e.dataTransfer.setDragImage(e.target, 0, 0);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e, item) => {
    e.preventDefault();
    dragCounter.current++;
    if (item.id !== draggedItem?.id) {
      setDragOverItem(item);
    }
  };

  const handleDragLeave = (e) => {
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setDragOverItem(null);
    }
  };

  const handleDrop = (e, dropItem) => {
    e.preventDefault();
    dragCounter.current = 0;

    if (draggedItem && draggedItem.id !== dropItem.id) {
      const draggedIndex = todos.findIndex(
        (item) => item.id === draggedItem.id
      );
      const dropIndex = todos.findIndex((item) => item.id === dropItem.id);

      const newTodos = [...todos];
      // Swap the items instead of just inserting
      [newTodos[draggedIndex], newTodos[dropIndex]] = [
        newTodos[dropIndex],
        newTodos[draggedIndex],
      ];

      setTodos(newTodos);
    }

    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
    dragCounter.current = 0;
  };

  return (
    <div className={`${m_p_d} bg-white rounded-lg shadow-lg`}>
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Draggable Todo List
      </h1>

      {/* Add Todo Form */}
      <div className="flex mb-6">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
          placeholder="Add a new todo..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Add
        </button>
      </div>

      {/* Todo List */}
      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            draggable
            onDragStart={(e) => handleDragStart(e, todo)}
            onDragOver={handleDragOver}
            onDragEnter={(e) => handleDragEnter(e, todo)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, todo)}
            onDragEnd={handleDragEnd}
            className={`
              flex items-center p-3 bg-gray-50 rounded-md border-2 cursor-move transition-all duration-200 ease-in-out
              ${
                draggedItem?.id === todo.id
                  ? "opacity-50 scale-105 shadow-lg transform rotate-1"
                  : ""
              }
              ${
                dragOverItem?.id === todo.id
                  ? "border-blue-400 bg-blue-50 scale-102 shadow-md"
                  : "border-transparent"
              }
              hover:bg-gray-100 hover:shadow-sm active:scale-98
            `}
            style={{
              transform:
                draggedItem?.id === todo.id
                  ? "rotate(2deg) scale(1.02)"
                  : dragOverItem?.id === todo.id
                  ? "scale(1.02)"
                  : "scale(1)",
              transition: "all 0.2s ease-in-out",
              boxShadow:
                draggedItem?.id === todo.id
                  ? "0 8px 25px rgba(0,0,0,0.15)"
                  : dragOverItem?.id === todo.id
                  ? "0 4px 12px rgba(59,130,246,0.15)"
                  : "",
            }}
          >
            {/* Drag Handle */}
            <div className="mr-3 text-gray-400 cursor-move">
              <svg
                width="12"
                height="16"
                viewBox="0 0 12 16"
                fill="currentColor"
              >
                <circle cx="2" cy="2" r="1" />
                <circle cx="6" cy="2" r="1" />
                <circle cx="10" cy="2" r="1" />
                <circle cx="2" cy="6" r="1" />
                <circle cx="6" cy="6" r="1" />
                <circle cx="10" cy="6" r="1" />
                <circle cx="2" cy="10" r="1" />
                <circle cx="6" cy="10" r="1" />
                <circle cx="10" cy="10" r="1" />
                <circle cx="2" cy="14" r="1" />
                <circle cx="6" cy="14" r="1" />
                <circle cx="10" cy="14" r="1" />
              </svg>
            </div>

            {/* Checkbox */}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="mr-3 w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />

            {/* Todo Text */}
            <span
              className={`flex-1 ${
                todo.completed ? "line-through text-gray-500" : "text-gray-800"
              } transition-colors duration-200`}
            >
              {todo.text}
            </span>

            {/* Delete Button */}
            <button
              onClick={() => deleteTodo(todo.id)}
              className="ml-2 p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors duration-200"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path
                  fillRule="evenodd"
                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>

      {todos.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No todos yet. Add one above!
        </div>
      )}

      <div className="mt-6 text-sm text-gray-500 text-center">
        Drag and drop to reorder items
      </div>
    </div>
  );
};

export default DraggableTodoList;
