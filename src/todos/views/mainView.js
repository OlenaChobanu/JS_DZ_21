import TodoHeaderView from "./header";
import TodoListView from "./list";
import './view.css';
import $ from 'jquery';

export default class MainViewTodo {
    #container = null;
    #options = null;

    #headerContainer = null;
    #listContainer = null;
    
    #listView = null;
    #headerView = null;

    constructor(container, options){
        this.#container = container;
        this.#options = options;

        this.init();

        this.#headerView = new TodoHeaderView(this.#headerContainer, this.#options);
        this.#listView = new TodoListView(this.#listContainer, this.#options);
    }

    async init() {
        this.renderView();
        this.initContainers();
    }

    async renderView(){
        $(this.#container).html(`
            <div class="wrapper">
                <div class="header"></div>
                <div class="todos-container">
                    <div class="todos-cont"></div>
                    <div class="edit-todo-cont"></div>
                </div>
            </div>`);
    }

    initContainers(){
        this.#headerContainer = $('.header');
        this.#listContainer = $('.todos-cont');
    }

    initialRender(todos) {
        this.renderHeader();
        this.renderTodos(todos);
    }

    renderHeader(){
        this.#headerView.renderHeader();
    }

    renderTodos(todos){
        this.#listView.renderTodos(todos);
        this.ifTodoCompleted(todos);
    }

    initListeners(){
        this.#headerView.initListener();
        this.#listView.initListener();
    }

    ifTodoCompleted(todos) {
        let currentData = getCurrentDate(); 

        function getCurrentDate() {
            let current = new Date();
            let year = current.getFullYear();
            let month = current.getMonth() + 1;
            if (month < 10) month = '0' + month;
            let date = current.getDate();
            if (date < 10) date = '0' + date;
            return date +'.'+ month +'.'+ year;
        }

        todos.forEach(e => {
            e.isComplete === true ? (
                $(`#${e.id}`).addClass('completed-todo'), 
                $(`#${e.id}`).append(`<li>completeDate: ${currentData}</li>`),
                $(`#${e.id}`).children('.btn-complete').addClass('hidden')) 
                : $(`#${e.id}`).addClass('')})
    }
}