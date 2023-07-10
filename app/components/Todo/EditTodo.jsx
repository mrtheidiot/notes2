"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TodoForm from "./TodoForm";

const EditTodo = ({ isOpen, setIsOpen, todo }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false)
  const router = useRouter();

  const onAddTodoHandler = async (newTodoItem) => {
    setIsLoading(true);

    const response = await fetch(`/api/todo/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "appliation/json",
      },
      body: JSON.stringify(newTodoItem),
    });

    console.log(response)

    if (response.ok) {
        setIsOpen(false);
    } else {
        setError({message: "There was an error editing the todo!"})
    }
    setIsLoading(false);
  };

  return (
    <div>
      <TodoForm
        edit={true}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isLoading={isLoading}
        functionToSubmit={onAddTodoHandler}
        todo={todo}
        error={error}
      />
    </div>
  );
};

export default EditTodo;
