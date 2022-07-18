import TodoModel from "./model";
import MainViewTodo from "./views/mainView";

export default class TodoController {
    #container = null;
    #view = null;
    #model = null;
    
    constructor(container){
        this.#container = container;
        this.#model = new TodoModel('todos/');

        this.#view = new MainViewTodo(this.#container, {
            onCreate: this.onCreateTodo,
            onDelete: this.onDeleteTodo,
            onEdit: this.onEditTodo,
        });
        this.init();
    }

    // async getTodos(){
    //     const todos = await this.#model.getTodos();
    //     console.log(todos, )
    // }
    async init(){
        const todos = await this.#model.getTodos();
        this.#view.initialRender(todos);
        this.#view.initListeners();
    }

    onCreateTodo = (todo) => {
        this.#model.createTodo(todo).then(r => {
            this.#model.getTodos().then(r => {
                this.#view.renderTodos(r);
            })
        });
    }

    onDeleteTodo = (id) => {
        this.#model.deleteTodo(id).then(r => {
            this.#model.getTodos().then(r => {
                this.#view.renderTodos(r);
            })
        })
    }

    onEditTodo = (id, todo) => {
        this.#model.editTodo(id, todo)
            .then(r => {
                r;
                this.#model.getTodos().then(r => {
                    this.#view.renderTodos(r);
                })
            })
    }
}
