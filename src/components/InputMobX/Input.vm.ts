import { action, makeObservable, observable } from "mobx";
class InputVM {
    
    @observable
    public value = '';

    constructor() {
        makeObservable(this)
    }

    @action
    public onChange = (value: string) => {
        this.value = value
    }

}

export default InputVM;