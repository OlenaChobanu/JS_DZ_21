import Http from '../shared/http';

export default class TodoModel {
    #http = null;
    #todos = null;
    #resours = null;
    
    constructor(resours){
        this.#resours = resours;
        this.#http = new Http(this.#resours);
        this.getTodos();
    }

    async getTodos(){
        this.#todos = await this.#http.get(this.#resours);
        return this.#todos;
    }

    async createTodo(todo){
        return this.#http
            .create(this.#resours, {...todo, isComplete: false})
            .then( r => r )
    }

    async deleteTodo(id){
        return this.#http.delete(this.#resours, id).then( r => r)
    }

    async editTodo(id, todo){
        return this.#http
            .update(this.#resours, id, todo)
    }
}    