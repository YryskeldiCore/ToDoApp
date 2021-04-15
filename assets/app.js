import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import TodoContextProvider from "./js/contexts/TodoContextProvider";
import TodoTable from "./js/components/TodoTable";
import {CssBaseline} from "@material-ui/core";

class App extends Component {
    render() {
        return (
            <TodoContextProvider>
                <CssBaseline>
                    <TodoTable/>
                </CssBaseline>
            </TodoContextProvider>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'))