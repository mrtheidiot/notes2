"use client";

import { formatDateToYYYYMMDD } from "../../../lib/formatDateToYYYYMMDD";
import { useRef, useState } from "react";
import EditForm from "./EditTodo";

const TodoListItem = ({ todo }) => {
  const dialog = useRef();
  const [showEditForm, setShowEditForm] = useState();

  const openDialog = () => {
    dialog.current.showModal();
  };

  const onDeleteButtonHandler = async () => {
    await fetch(`/api/todo/${todo.id}`, {
      method: "DELETE",
    }).then((res) => {
      dialog.current.close();
    });
  };

  const onShowEditFormHandler = () => {
    dialog.current.close();
    setShowEditForm(true);
  };

  return (
    <>
      {showEditForm && (
        <EditForm
          isOpen={showEditForm}
          setIsOpen={setShowEditForm}
          todo={todo}
        />
      )}
      <div
        onClick={openDialog}
        className="flex items-center cursor-pointer hover:bg-gray-700 p-2"
      >
        <div className="w-2/4 px-2 py-1">{todo.title} {todo.status === "Completed" && <>✅</>}</div>
        <div className="w-1/4 px-2 py-1 text-center">
          {formatDateToYYYYMMDD(todo.due_date)}
        </div>
        <div className="w-1/4 px-2 py-1 text-center">{todo.priority}</div>
      </div>

      <dialog
        className="p-6 bg-gray-800 text-white w-1/2 mx-auto rounded-lg shadow-lg transform transition-all duration-200"
        ref={dialog}
      >
        <h1 className="font-bold text-2xl mb-2 text-center">{todo.title}</h1>
        <p className="text-lg">{todo.details}</p>
        <p className="text-lg">
          Due Date: {formatDateToYYYYMMDD(todo.due_date)}
        </p>
        <p className="text-lg">Priority: {todo.priority}</p>
        <p className="text-lg">Status: {todo.status}</p>
        <div className="flex justify-between mt-6">
          <button
            onClick={onShowEditFormHandler}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded transition-colors duration-200 ease-in-out transform hover:scale-105"
          >
            Edit
          </button>
          <button
            onClick={onDeleteButtonHandler}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors duration-200 ease-in-out transform hover:scale-105"
          >
            Delete
          </button>
          <button
            onClick={() => dialog.current.close()}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors duration-200 ease-in-out transform hover:scale-105"
          >
            Close
          </button>
        </div>
      </dialog>
    </>
  );
};

export default TodoListItem;
