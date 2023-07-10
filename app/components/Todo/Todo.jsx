import TodoForm from "./TodoForm";
import TodoListItem from "./TodoListItem";
import AddTodo from "./AddTodo";
import { getAllTodos_convToArr } from "./../../../lib/getAllTodos_convToArr";

const Todo = async () => {
  const todos = await getAllTodos_convToArr();

  return (
    <>
      <AddTodo />
      <div className="flex flex-col text-white bg-gray-800">
        <div className="flex items-center p-2 border-b-2">
          <div className="w-2/4 px-2 py-1 ">Title</div>
          <div className="w-1/4 px-2 py-1 text-center">Due Date</div>
          <div className="w-1/4 px-2 py-1 text-center">Priority</div>
        </div>
        {todos.map((todo, index) => (
          <TodoListItem key={index} todo={todo} />
        ))}
      </div>
    </>
  );
};

export default Todo;
