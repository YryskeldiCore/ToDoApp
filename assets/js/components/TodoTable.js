import React, {Fragment,useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContextProvider";
import {IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteDialog from "./DeleteDialog";
import {func} from "prop-types";

function TodoTable() {
    const context = useContext(TodoContext)
    const [Todo, setTodo] = useState('');
    const [IsEditShown, setIsEditShown] = useState(false);
    const [EditTodo, setEditTodo] = useState('');
    const [DialogIsShown, setDialogIsShown] = useState(false);
    const [TodoWillBeDeleted, setTodoWillBeDeleted] = useState(null);

    return (
        <Fragment>
            <form onSubmit={(e) => {context.createTodo(e,{ name: Todo})}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Task</TableCell>
                            <TableCell align='right'>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <TextField label='New task'
                                           value={Todo}
                                           fullWidth={true}
                                           onChange={(e) => setTodo(e.target.value)}/>
                            </TableCell>
                            <TableCell align='right'>
                                <IconButton onClick={(e) => context.createTodo(e, {name: Todo})}>
                                    <AddBoxIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                        {context.todos.slice().reverse().map(todo => (
                            <TableRow key={todo.id}>
                                <TableCell>
                                    {IsEditShown === todo.id ?
                                        <TextField
                                            value={EditTodo}
                                            fullWidth={true}
                                            onChange={(e) => setEditTodo(e.target.value)}
                                            InputProps={{
                                                endAdornment:
                                                    <Fragment>
                                                        <IconButton onClick={() => {context.updateTodo({id:todo.id, name:EditTodo});
                                                            setIsEditShown(false)
                                                        }}>
                                                            <CheckCircleOutlineIcon/>
                                                        </IconButton>
                                                        <IconButton onClick={() => {setIsEditShown(false)}}>
                                                            <CancelIcon/>
                                                        </IconButton>
                                                    </Fragment>
                                            }}
                                        />
                                        :
                                        todo.name
                                    }
                                </TableCell>
                                <TableCell align='right'>
                                    <IconButton onClick={() => {setIsEditShown(todo.id); setEditTodo(todo.name)}}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {setDialogIsShown(true);
                                            setTodoWillBeDeleted({id: todo.id, name: todo.name})
                                        }}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </form>

            {DialogIsShown && (
                <DeleteDialog
                    Todo={TodoWillBeDeleted}
                    open={DialogIsShown}
                    setDialogIsShown={setDialogIsShown}/>
            )}
        </Fragment>
    );
}

export default TodoTable;