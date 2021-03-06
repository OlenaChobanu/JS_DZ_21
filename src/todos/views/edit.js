import * as $ from 'jquery';

export default class TodoEditView {
    #container = null;
    #options = null;
    #todos = [];
    #currentId = null;

    constructor(container, options) {
        this.#container = container;
        this.#options = options;

        // this.#currentId = currentId;
    }
    renderEdit(todos, currentId) {
        this.#todos = todos;
        this.#currentId = currentId;

        console.log(this.#todos, '17 edit');
        console.log(this.#currentId, '17 edit');

        this.#container.html(this.createEditEl());
    }

    createEditEl() {
        return `
            <div class="edit-todo hidden">
                <h2>Edit Todo:</h2>
                <input placeholder="todo title" type="text" class="inp-edit inp-edit-todo-title">
                <input placeholder="todo body" type="text" class="inp-edit inp-edit-todo-body">
                <button type="button" class="btn btn-save-changes">Save changes</button>    
            </div>
            `;
    }

    initListener(todos, currentId){
        // console.log('currentId 44', this.#currentId)

        $('.btn-save-changes').on('click', () => this.onSaveChanges(todos, currentId));
    }

    onSaveChanges = (todos, currentId) => {
        // this.#todos = todos;

        console.log('currentId 44', currentId)
        console.log('todos 44', todos)
        const editTodo = todos.find(element => element.id == currentId);
        console.log('editTodo 46', editTodo)

        editTodo.isComplete = 'false';
        editTodo.title = $('.inp-edit-todo-title').val();
        editTodo.body = $('.inp-edit-todo-body').val();
        this.#options.onEdit(currentId, editTodo);
        $('.inp-edit-todo-title').val('');
        $('.inp-edit-todo-body').val('');
        $('.edit-todo').addClass('hidden');
    }
}