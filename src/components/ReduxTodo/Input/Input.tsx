import { useState } from 'react';
import {useAppDispatch} from "../../../hooks/UseAppRedux";
import {addTodo} from "../../../store/slices/todoSlice/todoSlice";


type InputProps = {

};

export const Input: React.FC<InputProps> = () => {
    const dispatch = useAppDispatch()
    const [value, setValue] = useState('');

    const handleAddTodo = () => {
        dispatch(addTodo(value));
        setValue('');
    };

    return (
        <div className="todo-input-container">
            <textarea className="todo-input" value={value} onChange={(event) => setValue(event.target.value)} />
            <button className="button-52" type="button" onClick={handleAddTodo}>
                Добавить
            </button>
        </div>
    );
};
