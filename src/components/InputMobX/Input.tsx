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
        <form>
            <textarea value={vm.value} onChange={(event) => {
                vm.onChange(event.target.value)
            }} />
            <button type='button' onClick={() => {
                todoVm.addTodo(vm.value)
                vm.onChange('')
            }
            }>
                add
            </button>
        </form>
    );
};

export default observer(Input);