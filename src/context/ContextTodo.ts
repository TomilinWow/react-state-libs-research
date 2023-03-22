import React from "react";
import {Todo} from "@/types/common";

export const TodoContext = React.createContext<{
    todoList: Todo[];
    addTodo: (content: string) => void;
    deleteTodo: (id: string) => void;
    editTodo: (content: string, id: string) => void;
    setIsDone: (isDone: boolean, id: string) => void;
}>({
    todoList: [],
    addTodo: () => {},
    deleteTodo: () => {},
    editTodo: () => {},
    setIsDone: () => {},
});