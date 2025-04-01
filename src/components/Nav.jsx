import React, { useState, createContext } from "react";
import logo from '../assets/completed-task.png';
import user from '../assets/user.png'

export default function Nav(props) {
  const resizedImage = user?.replace("=s96-c", "=s300-c");
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div
      className={`bg-white ${
        props.isLogin ? "block" : "hidden"
      } border-gray-200 dark:bg-gray-950`}
    >
      <nav
        className={`bg-white ${
          props.isLogin ? "block" : "hidden"
        } border-gray-200 dark:bg-gray-950`}
      >
        <div className="max-w-screen-xl relative flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center justify-between w-full md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src={logo} className="h-7" alt="TaskMate Logo" />
              <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
                TaskMate
              </span>
            </a>
            <div className="dark:text-white flex gap-2 text-lg font-semibold cursor-pointer">
              <div className="text-sm font-semibold flex items-center">
                {props.userName || "Guest User"}
              </div>
              <button
                type="button"
                className="flex text-sm rounded-full focus:ring-2 focus:ring-purple-600"
                onClick={toggleDropdown}
              >
                <img
                  className="w-8 h-8 rounded-full border-purple-400"
                  src={resizedImage || "https://via.placeholder.com/150"}
                  alt="User Profile"
                  referrerPolicy="no-referrer"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute z-10 mt-10 right-2 bg-white divide-y rounded-lg shadow-lg dark:bg-gray-700">
                  <div className="px-4 py-3 text-sm text-gray-900 flex flex-col gap-4 dark:text-white">
                    <div className="font-bold">{props.userName || "User"}</div>
                    <div className="font-light truncate">
                      {props.userEmail || "user@example.com"}
                    </div>
                    <button
                      className="text-purple-600 hover:text-purple-800"
                      onClick={props.handlelogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="upper max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <h1 className="text-lg font-semibold dark:text-white">
          {props.taskLength} Task{props.taskLength !== 1 ? "s" : ""}
        </h1>
        <button
          type="button"
          onClick={props.handleTaskEntryOpen}
          className="focus:outline-none text-white bg-purple-600 hover:bg-purple-700 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700"
        >
          Add New Task
        </button>
      </div>
      <h1 className="text-xl font-bold dark:text-white max-w-screen-xl flex items-center mx-auto px-4 py-2">
        My Tasks
      </h1>
    </div>
  );
}
