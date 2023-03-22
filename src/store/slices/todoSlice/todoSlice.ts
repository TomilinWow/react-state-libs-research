import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Todo = {
    id: string;
    content: string;
    isDone: boolean;
    date: string;
};

type TodoState = {
    todoList: Todo[];
};

const initialState: TodoState = {
    todoList: [],
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            const newTodo: Todo = {
                content: action.payload,
                isDone: false,
                date: new Date().toISOString(),
                id: `${(Math.random() * 100)}-${Date.now()}`,
            };
            state.todoList.push(newTodo);
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todoList = state.todoList.filter(
                (todo) => todo.id !== action.payload
            );
        },
        editTodo: (state, action: PayloadAction<{ id: string; content: string }>) => {
            state.todoList = state.todoList.map((todo) => {
                if (todo.id === action.payload.id) {
                    return { ...todo, content: action.payload.content };
                }
                return todo;
            });
        },
        setIsDone: (state, action: PayloadAction<{ id: string; isDone: boolean }>) => {
            state.todoList = state.todoList.map((todo) => {
                if (todo.id === action.payload.id) {
                    return { ...todo, isDone: action.payload.isDone };
                }
                return todo;
            });
        },
    },
});

export const { addTodo, deleteTodo, editTodo, setIsDone } = todoSlice.actions;
export default todoSlice.reducer;