import React, {useCallback, useContext} from "react";
import {withRouter, Redirect} from "react-router";
import app from "./base.js";
import {AuthContext} from "./Auth.js";
import firebase from 'firebase/app';
import {Button, FormLabel} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import GoogleButton from 'react-google-button'

var provider = new firebase.auth.GoogleAuthProvider();

const Login = ({history}) => {
    const handleLogin = useCallback(
        async event => {
            event.preventDefault();
            const {email, password} = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );


    const gBtnLogin = useCallback(
        async event => {
            event.preventDefault();
            try {
                await app
                    .auth()
                    .signInWithPopup(provider).then(function (result) {
                        // This gives you a Google Access Token. You can use it to access the Google API.
                        // var token = result.credential.accessToken;
                        // The signed-in user info.
                        // var user = result.user;
                        // ...
                    }).catch(function (error) {
                        // Handle Errors here.
                        // var errorCode = error.code;
                        // var errorMessage = error.message;
                        // The email of the user's account used.
                        // var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        // var credential = error.credential;
                        // ...
                    });
                history.push("/");
            } catch (error) {
                alert(error);
            }
        },
        [history]
    );

    const {currentUser} = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/"/>;
    }

    return (
        <div>
            <h1>Log in</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <Typography>
                        <FormLabel>
                            <TextField name="email" type="email" placeholder="Email"/>
                        </FormLabel>
                    </Typography>
                    <Typography>
                        <FormLabel>
                            <TextField name="password" type="password" placeholder="Password"/>
                        </FormLabel>
                    </Typography>
                    <Button color={'primary'} type="submit">Sign in</Button>
                    <br/>
                    <br/>
                </div>
            </form>
            <GoogleButton onClick={gBtnLogin}/>
        </div>
    );
};

export default withRouter(Login);