import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Todo } from '@/types/common';
import MobxTodoAppVM from '@/pages/MobxTodoApp/MobxTodoApp.vm';
import TodoCardVM from './TodoCard.vm';

type TodoCardProps = {
    todo: Todo,
    todoVM: MobxTodoAppVM
}

const TodoCard: React.FC<TodoCardProps> = ({ todo, todoVM }) => {
    const [vm] = useState(() => new TodoCardVM(todo.content))
    return (
        <div>
            {vm.isEditMode ?
                <textarea value={vm.value} onChange={(event) => {
                    vm.onChangeValue(event.target.value)
                }} />
                :
                <label>
                    <input type='checkbox' checked={todo.isDone} onChange={() => {
                        todoVM.setIsDone(!todo.isDone, todo.id)
                    }} />
                    {todo.content}
                </label>
            }

            <span>{(new Date(todo.date)).toLocaleString()}</span>
            <button onClick={() => { todoVM.deleteTodo(todo.id) }}>delete</button>
            {vm.isEditMode ? <><button onClick={() => {
                todoVM.editTodo(vm.value, todo.id)
                vm.onChangeMode()
            }}>submit</button>
                <button onClick={() => {
                    vm.onChangeValue(todo.content)
                    vm.onChangeMode()
                }}>cancel</button>
            </> : <button onClick={() => { vm.onChangeMode() }}>edit</button>}

        </div>
    );
};

export default observer(TodoCard);