import { TodoModel } from "./TodosTypes";
import { Todo } from "./Todo";

import "./Todos.css";
import { useFetchData } from "./useFetchData";
import { FETCH_ALL_TODOS_URL } from "../../constants/TodosConstants";

export const Todos = () => {
  const todos = useFetchData(FETCH_ALL_TODOS_URL);

  return (
    <div className="todos-container">
      <h1 className="todos-header">Todo's</h1>
      {todos.map((todo: TodoModel) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};
