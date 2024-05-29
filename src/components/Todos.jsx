import React, { useContext, useState } from "react";
import { Table, Modal, Button } from "antd"; // Import Modal and Button from antd
import { ArrowDown, ArrowUp, Home, Plus } from "lucide-react";
import { TodoContext } from "../App";
import Model from "./Model";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";

const Todos = () => {
  const { state, dispatch } = useContext(TodoContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [pageSize, setPageSize] = useState(4); // Number of items per page
  const [isDarkMode, setIsDarkMode] = useState(false); // Track dark mode state
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTodoId, setSelectedTodoId] = useState(null); // Track the ID of the todo for which reminder is being set
  const [sorting, setSorting] = useState("desc"); // Track sorting state
  const navigate = useNavigate();

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTodo(null);
  };
  const handleToggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode); // Toggle dark mode state
  };

  const handleUpdate = (todo) => {
    setCurrentTodo(todo);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch({ type: "DELETE_TODO", payload: { id } });
  };

  const handleSetReminder = (record) => {
    setSelectedTodoId(record.id);
  };

  // Function to send email notification
  const sendEmailNotification = (email, subject, body) => {
    // Implement logic to send email notification
    console.log(
      `Email sent to ${email} with subject: ${subject} and body: ${body}`
    );
  };

  // Function to handle saving the reminder
  const saveReminder = () => {
    // Get the todo item based on selectedTodoId
    const todo = state.find((item) => item.id === selectedTodoId);

    // Check if todo exists and selectedDate is valid
    if (todo && selectedDate) {
      // Format the date
      const formattedDate = selectedDate.toLocaleString();

      // Save the reminder in the todo item
      todo.reminder = formattedDate;

      // Dispatch action to update the todo with the reminder
      dispatch({ type: "UPDATE_TODO", payload: todo });

      // Send email notification
      sendEmailNotification(
        todo.email, // Assuming todo.email contains the recipient's email address
        `Reminder for Todo: ${todo.text}`,
        `Don't forget to complete the task "${todo.text}" by ${formattedDate}.`
      );

      // Reset selectedTodoId and selectedDate
      setSelectedTodoId(null);
      setSelectedDate(new Date());
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (_, y, index) => index + 1,
    },
    {
      title: "Title",
      dataIndex: "text",
      key: "title",
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      render: (completed) => (
        <span className={` ${completed ? "text-green-500" : "text-red-500"}`}>
          {completed ? "Completed" : "Pending"}
        </span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-2">
          <button
            className="bg-green-400 text-white px-2 py-1 rounded"
            onClick={() => handleUpdate(record)}
          >
            Update
          </button>
          <button
            className="bg-pink-500 text-white px-2 py-1 rounded"
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
    {
      title: "Reminder",
      key: "reminder",
      render: (_, record) =>
        selectedTodoId === record.id ? (
          <div className="relative flex flex-col gap-2">
            <Calendar
              className="absolute top-full left-0 z-10"
              onChange={setSelectedDate}
              value={selectedDate}
            />
            <div className="flex gap-2">
              <Button type="primary" onClick={saveReminder}>
                Save Reminder
              </Button>
              <Button onClick={() => setSelectedTodoId(null)}>Cancel</Button>
            </div>
          </div>
        ) : (
          <Button type="link" onClick={() => handleSetReminder(record)}>
            Set Reminder
          </Button>
        ),
    },
  ];
  const handleGoHome = () => {
    navigate("/");
  };
  // Pagination configuration
  const pagination = {
    pageSize: pageSize,
    total: state.length,
    onChange: (page) => setCurrentPage(page),
  };

  const handleSorting = () => {
    setSorting(sorting === "asc" ? "desc" : "asc");
  };

  return (
    <div className={`max-w-4xl w-[95%] mx-auto ${isDarkMode ? "dark" : ""}`}>
      <div className="relative  ">
        <div
          className={`py-2 px-4 ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-purple-600 text-white"
          } md:text-center my-10 font-bold text-2xl md:4xl text-start `}
        >
          Todos
        </div>

        <button
          onClick={handleToggleDarkMode}
          className="absolute top-2 right-20 flex items-center justify-center px-4 py-2 text-gray-800 dark:text-gray-200  dark:hover:bg-gray-600 focus:outline-none"
        >
          {isDarkMode ? "Light" : "Dark"}
        </button>
        <div
            className="text-red text-2xl  md:3xl flex justify-center items-center  absolute top-4 right-40 cursor-pointer "
            onClick={handleGoHome}
          >
            <Home size={20}/>
          </div>
        <button
          onClick={handleSorting}
          className="absolute top-2 right-4 flex items-center justify-center px-4 py-2  text-gray-800 dark:text-gray-200 hover:bg-gray-800  focus:outline-none"
        >
          {sorting ? <ArrowUp /> : <ArrowDown />}
        </button>
      </div>

      <div
        className={`todos-container   mx-auto relative rounded-lg shadow-md h-1/2 min-h-[70dvh] ${
          isDarkMode ? "dark" : "bg-white"
        }`}
      >
        <div className="overflow-x-scroll    no-scrollbar">
          <Table
            className={`h-[70dvh] ${isDarkMode ? "bg-black" : "bg-white"}`}
            dataSource={state}
            columns={columns}
            rowKey="id"
            pagination={pagination}
            size={isDarkMode ? "small" : "middle"}
            bordered={!isDarkMode}
          />
        </div>
        <button
          onClick={handleOpenModal}
          className="bg-purple-600 z-40 whitespace-nowrap absolute left-1/2 transform -translate-x-1/2 -bottom-4 flex justify-center items-center gap-1 text-white font-bold py-2 px-4 rounded-full mt-4 hover:bg-blue-700 focus:outline-none"
        >
          <Plus size={15} /> New task
        </button>

        <Model
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          currentTodo={currentTodo}
        />
      </div>
    </div>
  );
};

export default Todos;
