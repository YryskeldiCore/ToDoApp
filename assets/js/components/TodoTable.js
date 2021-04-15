import React, {Fragment,useContext, useState} from 'react';
import {TodoContext} from "../contexts/TodoContextProvider";
import {IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteDialog from "./DeleteDialog";

function TodoTable() {
    const context = useContext(TodoContext)
    const [Todo, setTodo] = useState('');
    const [IsEditShown, setIsEditShown] = useState(false);
    const [EditTodo, setEditTodo] = useState('');
    const [DialogIsShown, setDialogIsShown] = useState(false);

    return (
        <Fragment>
            <form onSubmit={(e) => {context.createTodo(e,{task: Todo})}}>
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
                                <IconButton>
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
                                                        <IconButton onClick={() => {context.updateTodo({id:todo.id, task:EditTodo});
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
                                        todo.task
                                    }
                                </TableCell>
                                <TableCell align='right'>
                                    <IconButton onClick={() => {setIsEditShown(todo.id); setEditTodo(todo.task)}}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => {setDialogIsShown(true)}}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </form>

            <DeleteDialog open={DialogIsShown} setDialogIsShown={setDialogIsShown}/>
        </Fragment>
    );
}

export default TodoTable;