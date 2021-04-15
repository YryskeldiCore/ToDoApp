import React, {Component, createContext} from 'react';

export const TodoContext = createContext()

class TodoContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {id: 1, task: 'Learn Symfony 5'},
                {id: 2, task: 'Learn PHP'},
                {id: 3, task: 'Learn JavaScript'},
                {id: 4, task: 'Learn React'},
                {id: 5, task: 'Learn SQL'},
                {id: 6, task: 'Learn Twig'},
            ]
        }
    }

    //create
    createTodo(e,todo){
        e.preventDefault();
        const data = [...this.state.todos];
        console.log(data);
        console.log(todo)
        data.push(todo)
        this.setState({
            todos: data
        })
    }

    //read
    readTodo(){

    }

    //update
    updateTodo(data){
        console.log(data)
        const todos = [...this.state.todos];
        const taskInState = todos.find(todo => {
            return todo.id === data.id
        });

        taskInState.task = data.task;

        this.setState({
            todos: todos
        })
    }

    //delete
    deleteTodo(){

    }


    render() {

        return (
            <TodoContext.Provider value ={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this),
            }}>
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}

export default TodoContextProvider;