import { Todo } from "@/types/common";
import { action, makeObservable, observable } from "mobx";


class MobxTodoAppVM {
    
    @observable
    public todoList: Todo[] = [];

    constructor() {
        makeObservable(this)
    }

    private static idGenerator = (): string => {
        return `${(Math.random()*100)}-${(Date.now)}`
    }

    @action
    public addTodo = (content: string) => {
        const dateNow = new Date()
        this.todoList = [...this.todoList, {
            content, isDone: false, date: dateNow.toISOString(), id: MobxTodoAppVM.idGenerator()
        }]
    }

    @action
    public deleteTodo = (id: string) => {
        this.todoList = [...this.todoList].filter((todo) => todo.id !== id)
    }

    @action
    public editTodo = (content: string, id: string) => {
        this.todoList = this.todoList.map((todo) => {
            if (todo.id === id) {
                return {...todo, content}
            }
            return todo
        })
    }
    @action
    public setIsDone = (isDone: boolean, id: string) => {
         this.todoList = this.todoList.map((todo) => {
            if (todo.id === id) {
                return {...todo, isDone}
            }
            return todo
        })
    }
}

export default MobxTodoAppVM;