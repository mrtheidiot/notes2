"use client";

import React, { useState } from "react";
import { formatDateToYYYYMMDD } from "../../../lib/formatDateToYYYYMMDD";

export const TodoForm = ({
  edit,
  isOpen,
  setIsOpen,
  isLoading,
  functionToSubmit,
  todo,
  error,
}) => {
  const [title, setTitle] = useState(todo.title);
  const [details, setDetails] = useState(todo.details);
  const [dueDate, setDueDate] = useState(formatDateToYYYYMMDD(todo.due_date));
  const [priority, setPriority] = useState(todo.priority);
  const [status, setStatus] = useState(todo.status);

  const submitHandler = () => {
    const todoItem = {
      title,
      details,
      due_date: dueDate,
      priority,
      status,
    };

    functionToSubmit(todoItem);

    setTitle("");
    setDetails("");
    setDueDate("");
    setPriority("");
    setStatus("");
  };

  const dialogWindow = (
    <dialog
      className="p-4 bg-slate-600 rounded-lg shadow-white shadow-[30px_30px_30px_rgba(3,102,214,0.9)]"
      open={isOpen}
    >
      <div className="flex flex-col space-y-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="px-3 py-1 border rounded-md"
          placeholder="Title"
        />
        <textarea
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="px-3 py-1 border rounded-md"
          placeholder="Details"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="px-3 py-1 border rounded-md"
        />
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="px-3 py-1 border rounded-md"
        >
          <option value="">Select priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-1 border rounded-md"
        >
          <option value="">Select status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <div className="flex justify-between space-x-2 ">
          <button
            onClick={submitHandler}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-1/2"
          >
            {edit ? "Edit" : "Add"}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-1/2"
          >
            Close
          </button>
        </div>
      </div>
    </dialog>
  );

  const loadingWindow = (
    <dialog
      className="p-4 text-white bg-slate-600 rounded-lg shadow-lg shadow-white"
      open={isOpen}
    >
      <p>Your Todo is being added.. hold your horses</p>
    </dialog>
  );

  const errorWindow =
    error?.message?.length > 1 ? (
      <dialog
        className="p-4 text-white bg-slate-600 rounded-lg shadow-lg shadow-white"
        open={isOpen}
      >
        {error.message} <br />
        <button className="" onClick={() => setIsOpen(false)}>Close</button>
      </dialog>
    ) : null;

  const content = errorWindow
    ? errorWindow
    : isLoading
    ? loadingWindow
    : dialogWindow;

  return (
    <div className="absolute left-0 top-0 w-full pt-52 h-screen bg-black/50">
      {content}
    </div>
  );
};
