import TodoHeaderView from "./header";
import TodoListView from "./list";
import TodoEditView from "./edit";
import './view.css';
import 'jquery';
import $ from 'jquery';

export default class MainViewTodo {
    #container = null;
    #options = null;
    #todos = [];
    #currentId = null;


    #headerContainer = null;
    #listContainer = null;
    #editContainer = null;
    
    #listView = null;
    #headerView = null;
    #editView = null;

    constructor(container, options){
        this.#container = container;
        this.#options = options;
        this.init();
        this.#headerView = new TodoHeaderView(this.#headerContainer, this.#options);
        this.#listView = new TodoListView(this.#listContainer, this.#options);
        this.#editView = new TodoEditView(this.#editContainer, this.#options);
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
        this.#editContainer = $('.edit-todo-cont');
    }

    initialRender(todos) {
        this.renderHeader();
        this.renderTodos(todos);
        this.renderEdit(todos, this.#currentId);
    }

    renderHeader(){
        this.#headerView.renderHeader();
    }

    renderTodos(todos){
        this.#todos = todos;
        // console.log(this.#todos)
        this.#listView.renderTodos(todos);
        this.ifTodoCompleted(todos);
    }

    renderEdit(todos, currentId){
        this.#editView.renderEdit(todos, currentId);
    }

    initListeners(){
        this.#headerView.initListener();
        this.#listView.initListener();
        this.#editView.initListener();
        // this.setCurrentId();
    }
    // setCurrentId(){
    //     this.#currentId = this.#listView.getCurrentId()
    //     console.log('this.#currentId83', this.#currentId)
    // };

    // onTodo(){
    //     this.#listView.onTodoClick
    // }
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
            // console.log(e, '105')
            e.isComplete === true ? (
                $(`#${e.id}`).addClass('completed-todo'), 
                $(`#${e.id}`).append(`<li>completeDate: ${currentData}</li>`),
                $(`#${e.id}`).children('.btn-complete').addClass('hidden')) 
                : $(`#${e.id}`).addClass('')})
    }

}