import {Provider} from 'react-redux';
import {Input} from "../../components/ReduxTodo/Input/Input";
import {store} from "../../store/todo/index";
import TodoList from "../../components/ReduxTodo/TodoList/TodoList";


const ReduxTodoApp = () => {

    return (
        <div className='todo-container'>
            <Provider store={store}>
                <h1>ToDo Redux</h1>
                <Input />
                <TodoList/>
            </Provider>
        </div>
    );
};

export default ReduxTodoApp;