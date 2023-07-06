"use client";

import { useState, useRef, useEffect } from "react";
import { formatDate2 } from "../../../lib/formatedDate";
import TodoForm from "./ToDoForm";

const ToDoItem = ({ item, setTodo }) => {
  const dialog = useRef();

  const openDialog = () => {
    dialog.current.showModal();
  };

  const onDeleteButtonHandler = async () => {
    await fetch(`/api/todo/${item.id}`, {
      method: "DELETE",
    }).then((res) => {
      setTodo((prev) => prev.filter((item2) => item2.id !== item.id));
      dialog.current.close();
    });
  };

  return (
    <>
      <div
        onClick={openDialog}
        className="flex items-center cursor-pointer hover:bg-gray-700 p-2"
      >
        <div className="w-2/4 px-2 py-1">{item.title}</div>
        <div className="w-1/4 px-2 py-1 text-center">
          {formatDate2(item.due_date)}
        </div>
        <div className="w-1/4 px-2 py-1 text-center">{item.priority}</div>
      </div>

      <dialog
        className="p-6 bg-gray-800 text-white w-1/2 mx-auto rounded-lg shadow-lg transform transition-all duration-200"
        ref={dialog}
      >
        <h1 className="font-bold text-2xl mb-2 text-center">{item.title}</h1>
        <p className="text-lg">{item.details}</p>
        <p className="text-lg">Due Date: {formatDate2(item.due_date)}</p>
        <p className="text-lg">Priority: {item.priority}</p>
        <p className="text-lg">Status: {item.status}</p>
        <div className="flex justify-between mt-6">
          <button
            onClick={() => dialog.current.close()}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors duration-200 ease-in-out transform hover:scale-105"
          >
            Close
          </button>
          <button
            onClick={onDeleteButtonHandler}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors duration-200 ease-in-out transform hover:scale-105"
          >
            Delete
          </button>
          <button
            onClick={() => dialog.current.close()}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors duration-200 ease-in-out transform hover:scale-105"
          >
            Edit
          </button>
        </div>
      </dialog>
    </>
  );
};

const Todo = () => {
  const [items, setTodo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/todo`);
        const data = await response.json();

        // console.log(data);

        setTodo(data);
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <TodoForm setTodo={setTodo} />
      <div className="flex flex-col text-white bg-gray-800">
        <div className="flex items-center p-2 border-b-2">
          <div className="w-2/4 px-2 py-1 ">Title</div>
          <div className="w-1/4 px-2 py-1 text-center">Due Date</div>
          <div className="w-1/4 px-2 py-1 text-center">Priority</div>
        </div>
        {items.map((item, index) => (
          <ToDoItem key={index} item={item} setTodo={setTodo} />
        ))}
      </div>
    </>
  );
};

export default Todo;

//   // const [items, setTodo] = useState([]);

//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await fetch(`/api/todo`);
//   //       const data = await response.json();

//   //       console.log(data)

//   //       setTodo(data)

//   //     } catch (error) {
//   //       console.error("An error occurred while fetching data:", error);
//   //     }
//   //   };
//   //   fetchData();
//   // }, []);

// const items = [
//   {
//     item_id: 1,
//     title: "Demo Item",
//     details: "This is a demo to do item",
//     due_date: "2023-06-30T22:00:00.000Z",
//     priority: "Medium",
//     status: "Pending",
//   },
// ];

// {
//   item_id: 1,
//   title: "Grocery shopping",
//   details: "Buy milk, eggs, bread, and fruits",
//   due_date: "2023-07-05",
//   priority: "High",
//   status: "Pending",
// },
// {
//   item_id: 2,
//   title: "Finish project report",
//   details:
//     "Complete the final sections of the project report and proofread",
//   due_date: "2023-07-10",
//   priority: "Medium",
//   status: "In Progress",
// },
// ]
