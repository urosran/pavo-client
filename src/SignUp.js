import React, {useCallback} from "react";
import {withRouter} from "react-router";
import app from "./base";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {FormLabel} from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {makeStyles} from '@material-ui/core/styles';
import Input from "@material-ui/core/Input";

import GoogleButton from "react-google-button";
import firebase from 'firebase/app';
var provider = new firebase.auth.GoogleAuthProvider();

const SignUp = ({history}) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const {email, password} = event.target.elements;
        try {
            await app
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value);
            history.push("/");
        } catch (error) {
            alert(error);
        }
    }, [history]);

    const gBtnLogin = useCallback(
        async event => {
            event.preventDefault();
            try {
                await app
                    .auth()
                    .signInWithPopup(provider).then(function (result) {
                        // This gives you a Google Access Token. You can use it to access the Google API.
                        var token = result.credential.accessToken;
                        // The signed-in user info.
                        var user = result.user;
                        // ...
                    }).catch(function (error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        // var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;
                        // ...
                    });
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const useStyles = makeStyles(theme => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        titlePage: {
            marginBottom: 30
        },
        customBox: {
            padding: 20,
            flex: 1
        },
        customContainer: {
            paddingTop: 100,
            backgroundImage: "url('https://www.mediabistro.com/wp-content/uploads/2017/09/iStock-618179948.jpg')",
            // minHeight: '700'
        },
        googleBtn: {
            marginTop: 40,
        },
        title: {
            marginBottom: 20,
        },
        inputField: {
            padding: 10
        }

    }));

    const handleOnClick = () => {
        history.push('/login/')
    };
    const classes = useStyles();
    return (
        <Box height="100%" className={classes.customContainer}>

        <Grid container minHeight="100%" direction="column"
              justify="center" alignItems="center" >
            <Grid item xs={12} className={classes.titlePage}>
                <Typography variant={"h4"} color={'primary'}>Sign up</Typography>
            </Grid>
            <Grid item xs={12} justify={'center'} alignContent={'center'} alignItems={'center'}>
                <Box component={"form"} onSubmit={handleSignUp} className={classes.customBox}>
                    <Typography>

                    <Input name="email" type="email" placeholder="Email" className={classes.inputField}/>
                    </Typography>

                    <Typography>
                        <Input color='inherit' name="password" type="password" placeholder="Password"
                                   className={classes.inputField}/>
                    </Typography>
                    <Button type="submit" color='primary'>Sign Up</Button>
                    <Button onClick={handleOnClick}>LogIn</Button>
                </Box>
                <GoogleButton onClick={gBtnLogin} className={classes.googleBtn}/>
            </Grid>
        </Grid>
        </Box>
    );
};

export default withRouter(SignUp);