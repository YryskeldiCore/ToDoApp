import React, {useContext} from 'react';
import PropTypes from 'prop-types';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {TodoContext} from "../contexts/TodoContextProvider";

function DeleteDialog(props) {

    const context = useContext(TodoContext);

    const hide = () => {
        props.setDialogIsShown(false)
    }

    return (
        <Dialog
            onClose={hide}
            open={props.open}>
            <DialogTitle>Are you sure you wish to delete the task ?!</DialogTitle>
            <DialogContent>
                {props.Todo.task}
            </DialogContent>
            <DialogActions>
                <Button onClick={hide}>Back</Button>
                <Button onClick={() => {
                    context.deleteTodo({id: props.Todo.id, task: props.Todo.task});
                    hide();
                    }}>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}

DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    setDialogIsShown: PropTypes.func.isRequired,
    Todo: PropTypes.object
}

export default DeleteDialog;