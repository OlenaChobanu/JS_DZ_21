import * as $ from 'jquery';
import './edit.css';

export default class TodoEditView {
    #container = null;
    #options = null;

    constructor(container, options) {
        this.#container = container;
        this.#options = options;
    }

    renderEdit() {
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
        $('.btn-save-changes').on('click', () => this.onSaveChanges(todos, currentId));
    }

    onSaveChanges = (todos, currentId) => {
        const editTodo = todos.find(element => element.id == currentId);
        editTodo.isComplete = 'false';
        editTodo.title = $('.inp-edit-todo-title').val();
        editTodo.body = $('.inp-edit-todo-body').val();
        this.#options.onEdit(currentId, editTodo);
        $('.inp-edit-todo-title').val('');
        $('.inp-edit-todo-body').val('');
        $('.edit-todo').addClass('hidden');
    }
}