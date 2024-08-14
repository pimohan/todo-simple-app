import { useEffect, useState } from "react";
import { PATCH_TODO_URL } from "../../constants/TodosConstants";
import { patchData } from "../../constants/ApiUtils";

interface TodoStatusProps {
  id: number;
  completed: boolean;
}

export const TodoStatus = (props: TodoStatusProps) => {
  const { id, completed } = props;
  const [status, setStatus] = useState<boolean>(completed);

  const handleStatusChange = async () => {
    setStatus((value) => {
      const newStatus = !value;
      patchData(PATCH_TODO_URL, id, {
        completed: newStatus,
      });
      return newStatus;
    });
  };

  useEffect(() => {
    setStatus(status);
  }, [status]);

  return (
    <div
      className="todo-status"
      style={{ color: status ? "green" : "red" }}
      onClick={handleStatusChange}
    >
      {status ? "✔" : "🟥"}
    </div>
  );
};
