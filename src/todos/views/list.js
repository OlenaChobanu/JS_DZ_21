import * as $ from 'jquery';

export default class TodoListView {
    #container = null;
    #options = null;
    #todos = [];
    #currentId = null;

    constructor(container, options) {
        this.#container = container;
        this.#options = options;
        // this.#todos = todos;
    }

    renderTodos(todos) {
        this.#todos = todos;
        this.#container.html(this.#todos.map(t => this.createTodoEl(t)).join(''));
    }

    createTodoEl(todo) {
        return `
            <ul id="${todo.id}" class="single-todo">
                <button type="button" class="btn-delete" name="delete">x</button>
                <li>title: ${todo.title}</li>
                <li>body: ${todo.body}</li>
                <li>isComplete: ${todo.isComplete}</li>
                <button type="button" class="btn btn-complete" name="complete">Complete</button>
            </ul>
            `;
    }

    initListener(){
        $('.todos-cont').on('click', (e) => this.onTodoClick(e));
    }

    onTodoClick = (e) => {
        console.log(e.target)
        // console.log(this.#todos)
        if ($(e.target).hasClass('single-todo')) {
            this.#currentId = e.target.id;
            $('.single-todo').removeClass('single-todo-active');
            $(e.target).addClass('single-todo-active');
        } else  {
            this.#currentId = e.target.closest('.single-todo').id;
            $('.single-todo').removeClass('single-todo-active');
            $(e.target).parent('.single-todo').addClass('single-todo-active');

        }

        if(e.target.classList.contains('btn-delete')) {
            this.onTodoDelete(this.#currentId);
        } else if(e.target.classList.contains('btn-complete')) {
            this.onTodoComplete(this.#todos, this.#currentId); 
        } else {
            $('.edit-todo').removeClass('hidden');
        } 
    }

    onTodoDelete = () => {
        $('.edit-todo').addClass('hidden');
        this.#options.onDelete(this.#currentId);
    }

    onTodoComplete = (todos, id) => {
        // console.log(this.#todos)
        // console.log(todos,'66')
        $('.edit-todo').addClass('hidden');
        const completedTodo = todos.find(element => element.id == id);
        completedTodo.isComplete = 'true';
        this.#options.onEdit(id, completedTodo);
    }
}