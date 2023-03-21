import Input from '../../components/InputMobX/Input';
import React, { useState } from 'react';
import MobxTodoAppVM from './MobxTodoApp.vm';
import { observer } from 'mobx-react-lite';
import TodoCard from '../../components/TodoCardMobX/TodoCard';

const MobxTodoApp = () => {
    const [vm] = useState(() => new MobxTodoAppVM())
    return (
        <div className='todo-container'>
            <h1>ToDo MobX</h1>
            <Input todoVm={vm} />

            {vm.todoList.map((todo) => {
                return (
                    <TodoCard todo={todo} todoVM={vm} key={todo.id} />
                )
            })}

        </div>
    );
};

export default observer(MobxTodoApp);