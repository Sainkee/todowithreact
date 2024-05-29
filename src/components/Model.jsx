import React, { useContext, useEffect, useRef, useState } from "react";
import { X, Check } from "lucide-react";
import { TodoContext } from "../App";

export default function Model({ isOpen, onClose, currentTodo }) {
  const [todoText, setTodoText] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const focusRef = useRef();

  const { dispatch } = useContext(TodoContext);

  useEffect(() => {
    if (currentTodo) {
      setTodoText(currentTodo.text);
      setIsCompleted(currentTodo.completed);
    } else {
      setTodoText("");
      setIsCompleted(false);
    }
    if (isOpen) {
      focusRef.current.focus();
    }
  }, [isOpen, currentTodo]);

  const handleInputChange = (event) => {
    setTodoText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const timestamp = new Date().toLocaleString();

    if (currentTodo) {
      // If currentTodo exists, it means we're updating an existing todo
      dispatch({
        type: "UPDATE_TODO",
        payload: {
          id: currentTodo.id,
          text: todoText,
          completed: isCompleted,
          createdAt: currentTodo.createdAt, // Preserve the original creation date
        },
      });
    } else {
      // If currentTodo doesn't exist, it means we're adding a new todo
      dispatch({
        type: "ADD_TODO",
        payload: {
          text: todoText,
          completed: isCompleted,
          createdAt: timestamp,
          id: crypto.randomUUID(),
        },
      });
    }
    // Reset the form fields
    setTodoText("");
    focusRef.current.focus();
    setIsCompleted(false);
    onClose();
  };

  return (
    <dialog id="my_modal_3" className="modal" open={isOpen}>
      <div className="modal-box relative p-6">
        <form method="dialog">
          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label
              htmlFor="todo-text"
              className="text-lg font-medium text-gray-700"
            >
              Enter your todo
            </label>
            <input
              id="todo-text"
              ref={focusRef}
              type="text"
              placeholder="e.g., buy something."
              className="w-full px-3 py-2 rounded-md border dark:text-white  border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={todoText}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={isCompleted}
              onChange={() => setIsCompleted(!isCompleted)}
              className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
            />
            <label className="text-gray-700">Completed</label>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-blue flex items-center space-x-2 py-2 px-4 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Check className="w-5 h-5" />
              <span>{currentTodo ? "Update Todo" : "Add Todo"}</span>
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
