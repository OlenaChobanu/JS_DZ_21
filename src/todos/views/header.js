import * as $ from 'jquery';
import './header.css';

export default class TodoHeaderView {
    #container = null;
    #options = null;

    constructor(container, options) {
        this.#container = container;
        this.#options = options;
    }

    renderHeader() {
        this.#container.html(this.createHeaderEl());
    }

    createHeaderEl() {
        return `
            <input placeholder="todo title" id="title" type="text">
            <input placeholder="todo body" id="body" type="text">
            <button type="button" class="btn btn-add-todo">Add Todo</button>
            `;
    }

    initListener(){
        $('.btn-add-todo').on('click', () => this.onTodoCreate());
    }

    onTodoCreate = () => {
        $('.edit-todo').addClass('hidden');
        const title = $('#title').val();
        const body = $('#body').val();
        this.#options.onCreate({title, body});
        $('#title').val('');
        $('#body').val('');
    }
}