import { useSelector } from 'react-redux';
import {RootState} from "../../store/todo";
import {Input} from "../../components/ReduxTodo/Input/Input";
import {TodoCard} from "../../components/ReduxTodo/TodoCard/TodoCard";


const ReduxTodoApp = () => {
    const todoList = useSelector((state: RootState) => state.todos.todoList);

    return (
        <div className='todo-container'>
            <h1>ToDo Redux</h1>
            <Input />
            <div className="todo-list-all">
            {todoList.map((todo: any) => {
                return <TodoCard todo={todo} key={todo.id} />;
            })}
            </div>
        </div>
    );
};

export default ReduxTodoApp;