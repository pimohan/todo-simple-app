import { useEffect, useState } from "react";
import { TodoModel } from "./TodosTypes";

export const useFetchData = (apiURL: string): Array<TodoModel> => {
  const [todos, setTodos] = useState<TodoModel[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(apiURL);
      const result = await response.json();
      setTodos(result);
      console.log(result);
    })();
  }, [apiURL]);

  return todos;
};
