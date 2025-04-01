import React from "react";

export default function See(props) {
  return (
    <div className="flex justify-center items-center h-full w-full dark:bg-gray-950 dark:bg-opacity-60">
      <div className="dark:bg-slate-800 bg-purple-100 rounded-lg shadow-md p-5 w-80 relative">
        <div className="flex justify-between text-gray-600 dark:text-gray-300 text-sm pt-3">
          <h2 className="text-lg font-semibold dark:text-white text-gray-800 mb-2">
            {props.title}
          </h2>
          <div>
            <p className="pr-5">{props.date}</p>
            <p className="pr-5 text-xs">{props.time}</p>
          </div>

          <button
            className="absolute top-3 right-3 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-500 hover:text-white transition duration-300"
            onClick={() => props.handleClose()}
          >
            ✖
          </button>
        </div>

        <p className="text-sm dark:text-gray-300 text-gray-600 mt-6">
          {props.description}
        </p>
      </div>
    </div>
  );
}
