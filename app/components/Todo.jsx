"use client";

import { useState, useRef, useEffect } from "react";
import TodoForm from "./ToDoForm";
import { useRouter } from "next/navigation";

const ToDoItem = ({ item, setTodo }) => {
  const dialog = useRef();
  const router = useRouter();

  const openDialog = () => {
    dialog.current.showModal();
  };

  const formatDateForInput = (dateISO) => {
    // let dateStr = "2023-06-26T15:20:00.000Z"; // ISO format date string
    let date = new Date(dateISO);

    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const onDeleteButtonHandler = async () => {
    await fetch(`/api/todo/${item.item_id}`).then((res) => {
      dialog.current.close();
      router.push("/notes");
    });
  };

  return (
    <>
      <div
        onClick={openDialog}
        className="flex items-center cursor-pointer hover:bg-gray-700 p-2"
      >
        <div className="w-3/5 px-2 py-1">{item.title}</div>
        <div className="w-1/5 px-2 py-1">
          {formatDateForInput(item.due_date)}
        </div>
        <div className="w-1/5 px-2 py-1">{item.status}</div>
      </div>

      <dialog className="p-4 bg-gray-800 text-white w-1/4" ref={dialog}>
        <h1 className="font-bold text-lg mb-2">{item.title}</h1>
        <p>{item.details}</p>
        <p>Due Date: {formatDateForInput(item.due_date)}</p>
        <p>Priority: {item.priority}</p>
        <p>Status: {item.status}</p>
        <div className="flex justify-between">
          <button
            onClick={() => dialog.current.close()}
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Close
          </button>
          <button
            onClick={onDeleteButtonHandler}
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Delete
          </button>
          <button
            onClick={() => dialog.current.close()}
            className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Edit
          </button>
        </div>
      </dialog>
    </>
  );
};

const Todo = () => {
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

  const [items, setTodo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/todo`);
        const data = await response.json();

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
        <div className="flex items-center p-2">
          <div className="w-3/5 px-2 py-1">Title</div>
          <div className="w-1/5 px-2 py-1">Due Date</div>
          <div className="w-1/5 px-2 py-1">Status</div>
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
