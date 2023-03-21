import MobxTodoAppVM from '@/pages/MobxTodoApp/MobxTodoApp.vm';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import InputVM from './Input.vm';

type InputProps = {
    todoVm: MobxTodoAppVM
}

const Input: React.FC<InputProps> = ({todoVm}) => {
    const [vm] = useState(() => new InputVM())
    return (
        <div className='todo-input-container'>
            <textarea
                className="todo-input"
                value={vm.value}
                onChange={(event) => {
                vm.onChange(event.target.value)
            }} />
            <button className='button-52' type='button' onClick={() => {
                todoVm.addTodo(vm.value)
                vm.onChange('')
            }}>
                Добавить
            </button>
        </div>
    );
};

export default observer(Input);