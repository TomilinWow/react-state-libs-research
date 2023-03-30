import { useContext, useState } from 'react';

import {TodoContext} from "../../../context/ContextTodo";
import {Todo} from "../../../types/common";


type TodoCardProps = {
    todo: Todo,
}

export const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [value, setValue] = useState(todo.content);
    const { deleteTodo, editTodo, setIsDone } = useContext(TodoContext);

    const handleEdit = () => {
        if (isEditMode) {
            editTodo(value, todo.id);
        }
        setIsEditMode(!isEditMode);
    }

    return (
        <div className='todo-list'>
            <div className="checkbox-wrapper-18">
                <div className="round">
                    <input
                        type="checkbox"
                        id={`checkbox-18-${todo.id}`}
                        checked={todo.isDone}
                        onChange={() => setIsDone(!todo.isDone, todo.id)}
                    />
                    <label htmlFor={`checkbox-18-${todo.id}`}></label>
                </div>
            </div>

            <div className='todo-card-container '>

                {isEditMode ?
                    <textarea
                        id='input-edit'
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                    />
                    :
                    <div id='content' style={{ marginBlock: 'auto' }}>
                        {todo.content}
                    </div>
                }

                <div>
                    <div className='todo-card-buttons'>
                        {isEditMode ?
                            <>
                                <button className='button ok' onClick={handleEdit}>
                                    ок
                                </button>
                                <button className='button' onClick={() => {
                                    setValue(todo.content);
                                    setIsEditMode(false);
                                }} >
                                    отменить
                                </button>
                            </>
                            :
                            <button  className='button edit' onClick={handleEdit}>
                                изменить
                            </button>
                        }
                        <button className='button delete' onClick={() => deleteTodo(todo.id)}>
                            удалить
                        </button>
                    </div>
                    <div className='todo-date'>
                        <div>{(new Date(todo.date)).toLocaleString()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};