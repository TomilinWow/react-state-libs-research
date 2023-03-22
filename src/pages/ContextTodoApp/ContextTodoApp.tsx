import {useCallback, useState} from "react";
import {Todo} from "../../types/common";
import {TodoContext} from "../../context/ContextTodo";
import {Input} from "../../components/ContextTodo/Input/Input";
import {TodoCard} from "../../components/ContextTodo/TodoCard/TodoCard";

const ContextTodoApp = () => {
    const [todoList, setTodoList] = useState<Todo[]>([]);

    const addTodo = useCallback(
        (content: string) => {
            const newTodo = {
                content,
                id: `${(Math.random() * 100)}-${Date.now()}`,
                date: new Date().toISOString(),
                isDone: false,
            };
            setTodoList([...todoList, newTodo]);
        },
        [todoList]
    );

    const deleteTodo = useCallback(
        (id: string) => {
            setTodoList(todoList.filter((todo) => todo.id !== id));
        },
        [todoList]
    );

    const editTodo = useCallback(
        (content: string, id: string) => {
            setTodoList((prevList) =>
                prevList.map((todo) =>
                    todo.id === id ? { ...todo, content } : todo
                )
            );
        },
        []
    );

    const setIsDone = useCallback(
        (isDone: boolean, id: string) => {
            setTodoList((prevList) =>
                prevList.map((todo) => (todo.id === id ? { ...todo, isDone } : todo))
            );
        },
        []
    );

    return (
        <div className="todo-container">
            <h1>ToDo Context API</h1>
            <TodoContext.Provider
                value={{ todoList, addTodo, deleteTodo, editTodo, setIsDone }}
            >
                <Input />
                {todoList.map((todo) => (
                    <TodoCard todo={todo} key={todo.id} />
                ))}
            </TodoContext.Provider>
        </div>
    );
};

export default ContextTodoApp;