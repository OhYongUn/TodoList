import { useState, useEffect } from "react";
import {
  createTodos,
  deleteTodosSoft,
  getTodos,
  getTodosBySearch,
  updateTodos,
} from "@/apis/todos-no-rls";
import { tree } from "next/dist/build/templates/app-page";
import { Database } from "@/types/supabase";
type TodoDto = Database["public"]["Tables"]["todos_no_rls"]["Row"];

const useTodosController = () => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<TodoDto[]>([]);
  const onGetTodos = async () => {
    setLoading(true);
    try {
      const resultTodos = await getTodos();
      if (resultTodos) setTodos(resultTodos);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onGetTodos();
  }, []);

  const onCreateEmptyTodos = async () => {
    await createTodos("");
    await onGetTodos();
  };

  // todo 업데이트
  const onUpdateTodos = async (id: number, content: string) => {
    await updateTodos(id, content);
    await onGetTodos();
  };
  // todo 삭제
  const onDeleteTodos = async (id: number) => {
    await deleteTodosSoft(id);
    await onGetTodos();
  };
  // todo 검색
  const onSearchTodos = async (terms: string) => {
    if (terms) {
      const todoResult = await getTodosBySearch(terms);
      if (todoResult) setTodos(todoResult);
    } else {
      await onGetTodos();
    }
  };
  return {
    loading,
    todos,
    onCreateEmptyTodos,
    onUpdateTodos,
    onDeleteTodos,
    onSearchTodos,
  };
};

export default useTodosController;
