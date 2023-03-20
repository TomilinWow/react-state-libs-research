import { action, makeObservable, observable } from "mobx";

class TodoCardVM {
    
    @observable
    public isEditMode = false;

    @observable
    public value: string;

    constructor(value: string) {
        this.value = value;
        makeObservable(this)
    }

    @action
    public onChangeMode = () => {
        this.isEditMode = !this.isEditMode
    }
    @action
    public onChangeValue = (value: string) => {
        this.value = value;
    }

}

export default TodoCardVM;