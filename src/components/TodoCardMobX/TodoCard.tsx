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
        <div className='todo-list'>
            <div className="checkbox-wrapper-18">
                <div className="round">
                    <input
                        type="checkbox"
                        id={`checkbox-18-${todo.id}`}
                        checked={todo.isDone}
                        onChange={() => { todoVM.setIsDone(!todo.isDone, todo.id) }} />
                    <label htmlFor={`checkbox-18-${todo.id}`}></label>
                </div>
            </div>

            <div className='todo-card-container '>

                {vm.isEditMode ?
                    <textarea
                        value={vm.value}
                        onChange={(event) => { vm.onChangeValue(event.target.value) }}
                    />
                    :
                    <div style={{ marginBlock: 'auto' }}>
                        {todo.content}
                    </div>
                }

                <div>
                    <div className='todo-card-buttons'>
                        {vm.isEditMode ?
                            <>
                                <button className='button ok' onClick={() => {
                                    todoVM.editTodo(vm.value, todo.id)
                                    vm.onChangeMode()
                                }} >
                                    ок
                                </button>
                                <button className='button' onClick={() => {
                                    vm.onChangeValue(todo.content)
                                    vm.onChangeMode()
                                }} >
                                    отменить
                                </button>
                            </>
                            :
                            <button className='button' onClick={() => { vm.onChangeMode() }}>
                                изменить
                            </button>
                        }
                        <button className='button delete' onClick={() => { todoVM.deleteTodo(todo.id) }}>
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

export default observer(TodoCard);