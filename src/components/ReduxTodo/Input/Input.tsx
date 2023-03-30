import {FC, useState} from 'react';
import {addTodo} from "../../../store/todo/slices/todoSlice/todoSlice";
import {useAppDispatch} from "../../../store/todo/index";

export const Input: FC = () => {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState('');

    const handleAddTodo = () => {
        dispatch(addTodo(value));
        setValue('');
    };

    return (
        <div id='todo-input-container' className="todo-input-container">
            <textarea className="todo-input" value={value} onChange={(event) => setValue(event.target.value)} />
            <button className="button-52" type="button" onClick={handleAddTodo}>
                Добавить
            </button>
        </div>
    );
};
