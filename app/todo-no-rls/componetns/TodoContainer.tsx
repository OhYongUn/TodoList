"use client";
import React, { useEffect } from "react";
import useTodosController from "@/app/hooks/useTodosController";
import TodoListItem from "@/components/ui/TodoListItem";
import TodoList from "@/components/ui/TodoList";

const TodoContainer = () => {
  const {
    loading,
    todos,
    onCreateEmptyTodos,
    onDeleteTodos,
    onSearchTodos,
    onUpdateTodos,
  } = useTodosController();
  return (
    <div>
      <TodoList
        sharedUserFullName="test user"
        owerUserId="1121213121212"
        loading={loading}
        todoListData={todos}
        onUpdate={onUpdateTodos}
        onCreate={onCreateEmptyTodos}
        onDelete={onDeleteTodos}
        onSearch={onSearchTodos}
      />
    </div>
  );
};

export default TodoContainer;
