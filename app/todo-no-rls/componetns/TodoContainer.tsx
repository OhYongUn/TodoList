"use client";
import React, { useEffect } from "react";
import useTodosController from "@/app/hooks/useTodosController";

const TodoContainer = () => {
  const { loading, todos } = useTodosController();
  return <div>TodoContatiner</div>;
};

export default TodoContainer;
