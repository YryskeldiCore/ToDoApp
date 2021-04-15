import React from 'react';
import PropTypes from 'prop-types';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";

function DeleteDialog(props) {
    return (
        <Dialog open={props.open}>
            <DialogTitle>Are you sure you wish to delete the task ?!</DialogTitle>
            <DialogContent>
                //Task
            </DialogContent>
            <DialogActions>
                <Button onClick={()=> props.setDialogIsShown(false)}>Back</Button>
                <Button>Delete</Button>
            </DialogActions>
        </Dialog>
    );
}

DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired
}

export default DeleteDialog;