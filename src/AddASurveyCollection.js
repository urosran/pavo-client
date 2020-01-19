import React from 'react';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import axios from "axios";
import firebase from 'firebase/app';


const AddASurveyCollection = ({handleClose,
                              openModal}
                              ) => {
    var user = firebase.auth().currentUser;
    const [surveyName, setSurveyName] = React.useState('');
    const [surveyCollectionName, setSurveyCollectionName] = React.useState('');

    const handleSurveyNameChange = e => {
        setSurveyName(e.target.value);
    };

    const handleSurveyCollectionNameChange = e => {
        setSurveyCollectionName(e.target.value);
    };

    const handleAddSurvey = () => {
        axios({
            method: "POST",
            // url: "https://beluga-server.herokuapp.com/adduser",
            url: 'http://localhost:5001/addsurvey',
            data: {
                surveyCollectionName: surveyCollectionName,
                surveyName: surveyName,
                uuid: user.uid
            },
        }).then(response => {

                if (response.status === 200) {
                    console.log("Survey added, awesome!");
                    handleClose();
                }
            })
            .catch(function (error) {
                if (error.response) {
                    console.log("Something went wrong, please try again");
                }
            });

    };

    return (
        <Dialog open={openModal} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Create a Collection of Surveys</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    A single survey collection can contain many surveys with many questions -
                    each survey will have a unique link to it
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="surveyName"
                    label="Survey name"
                    type="text"
                    fullWidth
                    value={surveyName}
                    onChange={handleSurveyNameChange}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="surveyCollectionName"
                    label="Survey Collection Name"
                    type="text"
                    fullWidth
                    value={surveyCollectionName}
                    onChange={handleSurveyCollectionNameChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleAddSurvey} color="primary">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddASurveyCollection;