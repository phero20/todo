import React, { useState, useEffect } from "react";
import { SplitButton } from "primereact/splitbutton";
import See from "./See";
import TaskEntry from "./TaskEntry";
import UpdateTask from "./UpdateTask";

export default function Task(props) {
  const [tasks, setTasks] = useState([]);
  const [close, setClose] = useState(true);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleClose = () => {
    setClose(!close);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
    setClose(false);
  };

  const handleOperations = async (operation, index) => {
    if (operation === "Delete") {
      const updatedTasks = tasks.filter((task, i) => i !== index).reverse();
      setTasks(updatedTasks);
      props.deleteOperation(updatedTasks);
    } else if (operation === "Update") {
      const indexx = tasks.length - index - 1;
      await props.updateOperation(indexx);
      props.handleUpdatedOpen();
    } else if (operation === "Mark Completed") {
      const indexx = tasks.length - index - 1;
      props.handleMarked(indexx);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await props.data;
        if (data?.tasks) {
          setTasks(data.tasks.slice().reverse());
          props.setTaskkLength(data.tasks.length);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, [props.data]);

  return (
    <div
      className={`${
        props.isLogin ? "block" : "hidden"
      } dark:bg-gray-950 dark:text-white`}
    >
      <div className="down max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <ul className="w-full py-6 flex flex-col gap-5">
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <li key={index} className="flex w-full">
                <div
                  className={`flex w-full justify-between items-center ${
                    task.marked
                      ? "bg-purple-600"
                      : "dark:bg-slate-800 bg-purple-200"
                  } h-16 rounded-xl gap-3 p-3 pr-0`}
                >
                  <div
                    onClick={(e) => handleTaskClick(task)}
                    className={`date flex-shrink-0 flex flex-col text-sm justify-center ${
                      task.marked
                        ? "text-gray-300"
                        : "text-gray-800 dark:text-gray-300"
                    }`}
                    style={{ width: "20%" }}
                  >
                    <span
                      className={`font-normal ${
                        task.marked ? "text-white" : "dark:text-white"
                      } text-sm truncate`}
                    >
                      {task.time || "Time"}
                    </span>
                    <span>{task.date}</span>
                  </div>
                  <div
                    className={`data flex-grow flex flex-col text-sm justify-center ${
                      task.marked
                        ? "text-gray-300"
                        : "dark:text-gray-300 text-gray-800"
                    } overflow-hidden`}
                    style={{ width: "60%" }}
                    onClick={(e) => handleTaskClick(task)}
                  >
                    <p
                      className={`font-medium ${
                        task.marked
                          ? "text-white"
                          : "dark:text-white text-black"
                      } text-base`}
                    >
                      {task.title || "Task Title"}
                    </p>
                    <p className="text-ellipsis overflow-hidden whitespace-nowrap">
                      {task.descrip || "Task Description"}
                    </p>
                  </div>
                  <div
                    className="sub flex-shrink-0 flex items-center justify-center"
                    style={{ width: "20%" }}
                  >
                    <SplitButton
                      onClick={(event) => event.stopPropagation()}
                      model={[
                        {
                          label: "Update",
                          icon: "pi pi-refresh",
                          command: () => handleOperations("Update", index),
                        },
                        {
                          label: "Delete",
                          icon: "pi pi-trash",
                          command: () => handleOperations("Delete", index),
                        },
                        {
                          label: task?.marked
                            ? "Mark Uncompleted"
                            : "Mark Completed",
                          icon: "pi pi-check",
                          command: () =>
                            handleOperations("Mark Completed", index),
                        },
                      ]}
                    />
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="text-center w-full">No tasks available</li>
          )}
        </ul>
      </div>
      <div
        className={`h-full ${
          close ? "hidden" : "block"
        } absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50`}
      >
        {selectedTask && (
          <See
            handleClose={handleClose}
            title={selectedTask?.title || "No Title"}
            date={selectedTask?.date}
            description={selectedTask?.descrip || "No Description"}
            time={selectedTask?.time}
          />
        )}
      </div>
      <div
        className={`h-full ${
          props.isTaskEntryOpen ? "block" : "hidden"
        } absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50`}
      >
        <TaskEntry
          handleClose={() => props.handleTaskClose()}
          handleAddTask={props.handleAddTask}
        />
      </div>
      <div
        className={`h-full ${
          props.isUpdatedOpen ? "block" : "hidden"
        } absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50`}
      >
        <UpdateTask
          handleClose={() => props.handleUpdatedClose()}
          handleAddTask={props.handleAddTask}
          updateTitle={props.updateTitle}
          updateDescrip={props.updateDescrip}
          updateDate={props.updateDate}
          updateTime={props.updateTime}
          handleUpdateTask={props.handleUpdateTask}
        />
      </div>
    </div>
  );
}
