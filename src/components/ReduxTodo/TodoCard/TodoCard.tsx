import {Todo} from "../../../types/common";
import {FC, useState} from "react";
import {deleteTodo, editTodo, setIsDone} from "../../../store/todo/slices/todoSlice/todoSlice";
import {useAppDispatch} from "../../../store/todo/index";

type TodoCardProps = {
    todo: Todo;
};

export const TodoCard: FC<TodoCardProps> = ({ todo }) => {
    const dispatch = useAppDispatch()
    const [isEditMode, setIsEditMode] = useState(false);
    const [value, setValue] = useState(todo.content);

    const handleEdit = () => {
        setIsEditMode(true);
    };

    const handleCancel = () => {
        setValue(todo.content);
        setIsEditMode(false);
    };

    const handleSave = () => {
        dispatch(editTodo({ id: todo.id, content: value }));
        setIsEditMode(false);
    };

    const handleDelete = () => {
        dispatch(deleteTodo(todo.id));
    };

    const handleCheckboxChange = () => {
        dispatch(setIsDone({ id: todo.id, isDone: !todo.isDone }));
    };

    return (
        <div className="todo-list">
            <div className="checkbox-wrapper-18">
                <div className="round">
                    <input
                        type="checkbox"
                        id={`checkbox-18-${todo.id}`}
                        checked={todo.isDone}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor={`checkbox-18-${todo.id}`}></label>
                </div>
            </div>

            <div className="todo-card-container ">
                {isEditMode ? (
                    <textarea id="input-edit" value={value} onChange={(event) => setValue(event.target.value)} />
                ) : (
                        <div id="content" style={{ marginBlock: 'auto' }}>{todo.content}</div>
                )}

                <div>
                    <div className="todo-card-buttons">
                        {isEditMode ? (
                            <>
                                <button className="button ok" onClick={handleSave}>
                                    ок
                                </button>
                                <button className="button" onClick={handleCancel}>
                                    отменить
                                </button>
                            </>
                        ) : (
                            <button className="button edit" onClick={handleEdit}>
                                изменить
                            </button>
                        )}
                        <button className="button delete" onClick={handleDelete}>
                            удалить
                        </button>
                    </div>
                    <div className="todo-date">
                        <div>{new Date(todo.date).toLocaleString()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
