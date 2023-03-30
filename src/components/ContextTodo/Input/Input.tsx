import {useCallback, useContext, useState} from "react";
import {TodoContext} from "../../../context/ContextTodo";

export const Input = () => {
    const { addTodo } = useContext(TodoContext);
    const [value, setValue] = useState("");

    const handleSubmit = useCallback(() => {
        addTodo(value);
        setValue("");
    }, [addTodo, value]);

    return (
        <div id='todo-input-container' className="todo-input-container">
      <textarea
          className="todo-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
      />
            <button id='button' className="button-52" type="button" onClick={handleSubmit}>
                Добавить
            </button>
        </div>
    );
};