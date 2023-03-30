import React from 'react';
import {RootState, useAppSelector} from "../../../store/todo";
import {TodoCard} from "../TodoCard/TodoCard";



const TodoList = () => {
    const {todoList} = useAppSelector((state: RootState) => state.todos);

    return (
        <div className="todo-list-all">
            {todoList.map((todo: any) => {
                return <TodoCard todo={todo} key={todo.id} />;
            })}
        </div>
    );
};

export default TodoList;