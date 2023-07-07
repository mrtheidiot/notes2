"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const TodoForm = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    const newTodoItem = {
      title,
      details,
      due_date: dueDate,
      priority,
      status,
    };

    const response = await fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "appliation/json",
      },
      body: JSON.stringify(newTodoItem),
    });

    const data = await response.json();

    console.log(data);

    const newTodoItemCurrent = { ...newTodoItem, id: data };

    props.setTodo((prev) => [...prev, newTodoItemCurrent]);

    setTitle("");
    setDetails("");
    setDueDate("");
    setPriority("");
    setStatus("");

    setIsOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        Add
      </button>
      <dialog className="p-4 bg-slate-600 rounded-lg" open={isOpen}>
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
              onClick={handleSubmit}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-1/2"
            >
              Add
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
    </div>
  );
};

export default TodoForm;
