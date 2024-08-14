import { TodoModel } from "./TodosTypes";
import { TodoNumberLabel } from "./TodoNumberLabel";
import { TodoStatus } from "./TodoStatus";

interface TodoProps {
  todo: TodoModel;
}

export const Todo = (props: TodoProps) => {
  const { id, title, completed } = props.todo;

  return (
    <>
      <div className="todo-container">
        <div>
          <TodoNumberLabel key={id} sequence={id} />
        </div>
        <div className="todo-title">{title}</div>
        <div>
          <TodoStatus id={id} completed={completed} />
        </div>
      </div>
    </>
  );
};
