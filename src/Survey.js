import React, {Component} from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import app from "./base";
import {Box, makeStyles} from "@material-ui/core";
import Input from "@material-ui/core/Input";
// import loading from './assets/loading.gif'

window.MediaRecorder = require('audio-recorder-polyfill');
let audioUrl = undefined;
let mediaRecorder;
let audioChunks = [];
let audioBlob = undefined;
let url = undefined;

export default class CustomCard extends Component {

    constructor(props) {
        super(props);
        this.record = this.record.bind(this);
        this.startRecording = this.startRecording.bind(this);
        this.stopRecording = this.stopRecording.bind(this);
        this.state = {
            download_url: undefined,
            transcription: "",
            inProgress: false
        };
        this.speech_to_text = this.speech_to_text.bind(this);
        this.submit = this.submit.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.name = "";
        this.email = "";
        this.stream = undefined;
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    /* #region  Record handlers */
    record = () => {
        console.log("i am inside record");
        audioChunks = [];

        this.mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
        });

        this.mediaRecorder.ondataavailable = function (e) {
            audioChunks.push(e.data);
        };

        this.mediaRecorder.addEventListener("stop", () => {
            audioBlob = new Blob(
                audioChunks,
                {type: "audio/webm"},
                {mimetype: "audio/webm"}
            );

            audioUrl = URL.createObjectURL(audioBlob);
            // Play the audio
            // const audio = new Audio(audioUrl);
            // audio.play();
            this.setState(() => (url = audioUrl));

        });

    };
    getPermissions = async () => {
        try {
            if (this.stream === undefined) {
                this.stream = await navigator.mediaDevices.getUserMedia({
                    audio: true
                });
            }
        } catch (e) {
            console.log("Please allow microphone access");
            console.error(e)
        }
    };

    startRecording = async () => {
        try {

            this.stream = await navigator.mediaDevices.getUserMedia({
                audio: true
            });
        } catch (e) {
            console.log(e);
            console.log("please allow microphone acceess")
        }
        console.log(this.stream, "stream");
        if (this.stream === undefined) {
            console.log(this.stream, 'stream');
            console.log("please allow microphone access")
        } else {
            if (mediaRecorder === undefined) {
                let options = {mimeType: "audio/webm"};
                this.mediaRecorder = new MediaRecorder(this.stream, options);
                this.mediaRecorder.start();
                console.log(this.mediaRecorder.state, ".THEN");
                console.log("media recorderd started");
                this.record();
                console.log(this.mediaRecorder.state)
            } else {
                console.log('media recorder is active')
            }
        }
    };

    stopRecording = () => {
        if (this.mediaRecorder !== undefined) {
            console.log(this.mediaRecorder.state);

            if (this.mediaRecorder.state !== "inactive") {
                console.log(this.mediaRecorder.state);
                this.mediaRecorder.stop();
                console.log(this.mediaRecorder.state);
            } else {
                console.log("Please start the recording");
            }
        }
    };

    submit = () => {
        if (
            this.state.email === "" ||
            this.state.email === undefined ||
            this.state.name === ""
        ) {
            alert("Please input name,  email and record");
        } else {
            this.speech_to_text()
        }
    };

    speech_to_text = async () => {
        // console.log(audioUrl, "file");

        let blob = await fetch(audioUrl).then(r => r.blob());
        // console.log(blob, "blob");
        var file = new File([audioBlob], "audio.weba", {
            contentType: "audio/weba"
        });
        // console.log(file, "file text");
        // console.log(file.mimetype, "file mime");

        const photoFormData = new FormData();
        // dict of all elements
        photoFormData.append("avatar", file);
        photoFormData.append("email", this.state.email);
        photoFormData.append("name", this.state.name);

        let responseLocal = "some response";

        // TODO: Make sure error is being caught and exits the loop
        this.setState({inProgress: true});
        axios({
            method: "POST",
            url: "https://beluga-server.herokuapp.com/photo",
            // url: 'http://localhost:5001/photo',
            data: photoFormData,
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => {
                responseLocal = response.data;

                if (response.status === 200) {
                    this.setState({inProgress: false});
                    this.setState({transcription: responseLocal});

                    // console.log(responseLocal, "setting trans");
                    // console.log(this.state.transcription, "trans resp");
                    console.log("Email sent, awesome!");
                }
            })
            .catch(function (error) {
                if (error.response) {
                    console.log("Something went wrong, please try again");
                }
            });

        audioChunks = [];
        return this.responseLocal;
    };
    /* #endregion */

    /* #region  Email handlers */

    handleEmailChange(event) {
        this.setState({email: event.target.value});
    }

    handleNameChange(event) {
        this.setState({name: event.target.value});
    }

    /* #endregion */

    componentDidMount() {
    }

    useStyles = makeStyles(theme => ({
        transcription: {
            marginTop: 20
        },
        transcriptC: {
            marginTop: 50,

        }
    }));

    classes = this.useStyles;

    render() {
        return (
            <Grid container direction="column" justify="center" alignItems="center">
                <Grid item style={{paddingTop: 50, marginBottom: 30}} alignItems={'center'}>
                    <Typography variant="h5">How did you like the service provided?</Typography>
                </Grid>

                <Grid item element={'form'} noValidate autoComplete="off">
                    <Input
                        id="standard-basic"
                        placeholder="Name"
                        type="text"
                        onChange={this.handleNameChange}
                        style={{margin: 10}}
                    />
                    <Input
                        id="filled-basic"
                        placeholder="Email"
                        type="text"
                        onChange={this.handleEmailChange}
                        style={{margin: 10}}
                    />
                </Grid>

                <Grid item className={this.classes.transcriptC}>
                    <Box>
                        <Typography style={{
                            marginTop: 100,
                            marginBottom: 50,
                            border: 1,
                            borderRadius: 30,
                            borderColor: 'black'
                        }}>Transcription:</Typography>
                        {console.log(this.state.inProgress)}
                        {/*<img src={'https://cdn.dribbble.com/users/563824/screenshots/3633228/untitled-5.gif'}/>*/}

                        {/*{this.state.inProgress && <img height={50} width={200} src={'https://cdn.dribbble.com/users/563824/screenshots/3633228/untitled-5.gif'}/>}*/}
                        {this.state.inProgress && <img height={100} width={200} src={require('./assets/loading.gif')}/>}
                        <Typography>
                            {this.state.transcription}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item>
                    <Button color="primary" onClick={this.startRecording}>
                        start
                    </Button>
                    <Button color="secondary" onClick={this.stopRecording}>
                        stop
                    </Button>
                    <Button onClick={this.submit}>submit</Button>
                    <Button href={audioUrl} download="test.webm">
                        Download
                    </Button>
                </Grid>
                <Button onClick={() => app.auth().signOut()}>Sign out</Button>

            </Grid>
        );
    }
}
