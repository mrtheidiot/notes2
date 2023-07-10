"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TodoForm from "./TodoForm";

const AddTodo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const onAddTodoHandler = async (newTodoItem) => {
    setIsLoading(true);

    const response = await fetch("/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "appliation/json",
      },
      body: JSON.stringify(newTodoItem),
    });

    if (response.ok) {
      setIsOpen(false);
    } else {
      setError({ message: "There was an error adding the todo!" });
    }
    setIsLoading(false);
  };

  const todo = {
    title: "",
    details: "",
    due_date: new Date(),
    priority: "",
    status: "",
  };

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded w-full"
      >
        Add new todo item
      </button>
      {isOpen && (
        <TodoForm
          edit={false}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isLoading={isLoading}
          functionToSubmit={onAddTodoHandler}
          todo={todo}
          error={error}
        />
      )}
    </div>
  );
};

export default AddTodo;
