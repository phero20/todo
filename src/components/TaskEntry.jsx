import React, { useState } from "react";

export default function TaskEntry(props) {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, "0");
    const day = today.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [title, setTitle] = useState(props.title || "");
  const [descrip, setDescrip] = useState(props.descrip || "");
  const [datee, setDate] = useState(props.date || getCurrentDate());
  const [timee, setTime] = useState(props.time || getCurrentTime());

  const handleSaveTask = () => {
    if (title === "" || descrip === "" || datee === "" || timee === "") {
      alert("Please fill in all fields.");
      return;
    }

    const formattedDate = formatDate(datee);
    const formattedTime = convertTo12HourFormat(timee);
    props.handleAddTask({
      title,
      descrip,
      date: formattedDate,
      time: formattedTime,
    });

    setTitle("");
    setDescrip("");
    setDate(getCurrentDate());
    setTime(getCurrentTime());
  };

  const formatDate = (inputDate) => {
    const [year, month, day] = inputDate.split("-").map(Number);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${day} ${months[month - 1]}`;
  };

  const convertTo12HourFormat = (time24) => {
    const [hours, minutes] = time24.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const hours12 = hours % 12 || 12;
    return `${hours12}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  return (
    <div>
      <div className="fixed top-0 left-0 w-full p-3 h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-purple-100 dark:bg-gray-800 rounded-lg p-6 shadow-lg w-96 relative">
          <button
            onClick={props.handleClose}
            className="absolute top-3 right-3 bg-gray-300 hover:bg-red-500 text-black dark:bg-gray-700 dark:text-white dark:hover:bg-red-500 rounded-full w-6 h-6 flex items-center justify-center"
          >
            ✖
          </button>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
            Add New Task
          </h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Task Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter task title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Description
              </label>
              <textarea
                value={descrip}
                onChange={(e) => setDescrip(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter task description"
                rows="5"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Due Date
              </label>
              <input
                type="date"
                value={datee}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Due Time
              </label>
              <input
                type="time"
                value={timee}
                onChange={(e) => setTime(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <button
              type="button"
              onClick={handleSaveTask}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Save Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
