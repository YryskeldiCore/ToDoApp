import React, {Component, createContext} from 'react';
import axios from "axios";

export const TodoContext = createContext();

class TodoContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
    }

    componentDidMount() {
        this.readTodo()
    }


    //create
    createTodo(e, todo){
        e.preventDefault();
        console.log(todo)
        axios.post('api/create', todo)
            .then(res => {
                const data = [...this.state.todos];
                data.push(res.data)
                this.setState({
                    todos: data
                })
                this.readTodo()
            })
    }

    //read
    readTodo(){
        axios.get('api/read')
            .then(res => {
                console.log(res.data)
                    this.setState({
                        todos: res.data
                    })

            })
            .catch(err => {
                console.log(err)
            })
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
    deleteTodo(data){
        const todos = [...this.state.todos];
        const todo = todos.find(todo => {
            return todo.id === data.id
        })

        todos.splice(todos.indexOf(todo), 1);

        this.setState({
            todos:todos
        })

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