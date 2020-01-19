import React, {useContext, useEffect} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import {Menu} from '@material-ui/icons';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {mainListItems, secondaryListItems} from './listItems'
import Button from "@material-ui/core/Button";
import 'firebase/firestore';
import AddASurveyCollection from "./AddASurveyCollection";
import {AuthContext} from "./Auth";
import app from "./base";
import firebase from 'firebase/app';
import 'firebase/firestore';
import SurveyList from './SurveyList'
import axios from "axios";
import BackgroundSlideshow from 'react-background-slideshow'
import ImageGallery from 'react-image-gallery';
function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Beluga
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    modalCustom: {
        backgroundColor: 'white',
        margin: 40,
        padding: 40
    },
    fixedMinHeight: {
        minHeight: 240,
        marginTop: 10
    },
    modal: {
        borderRadius: 10
    },
    addSruveyBtn: {
        color: 'white',
        borderColor: 'white'
    }
}));

export default function Dashboard() {
    const classes = useStyles();
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [question, setQuestion] = React.useState([]);
    const [fetchedSurveys, setFetchedSurveys] = React.useState(null);
    const fixedHeightPaper = clsx(classes.paper, classes.fixedMinHeight);
    const screenWidth = window.screen.width;
    const {currentUser} = useContext(AuthContext);
    let transformedUserEmail = undefined;
    var db = firebase.firestore();
    var user = firebase.auth().currentUser;
    // useEffect(() => {
    //     transformUserEmail()
    // }, []);
    // useEffect(() => {
    //     fetchUserData()
    // }, []);
    console.log(user)
    const transformUserEmail = () => {
        // transformedUserEmail = currentUser.email.replace(".", "__DOT__").replace("@", "__AT__");
        transformedUserEmail = "testUser"
    };

    const handleOpen = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        console.log("called close")
        setOpenModal(false);

    };

    const handleDrawerOpen = () => {
        if (screenWidth > 500) {
            setOpenDrawer(true)
        }
    };

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    };

    const fetchUserData = () => {
        axios({
            method: "POST",
            // url: "https://beluga-server.herokuapp.com/adduser",
            url: 'http://localhost:5001/fetchsurveys',
            data: {
                uuid: user.uid
            }

        }).then(response => {
            console.log(response.data.collections, "response");
            if (response.status === 200) {
                setFetchedSurveys(response.data.collections);
                // console.log(fetchedSurveys, fetchedSurveys);
                // fetchedSurveys.forEach(function (item, index) {
                //         console.log(item)
                //
                //     }
            }
        })
            .catch(function (error) {
                if (error.response) {
                    console.log("Something went wrong, please try again");
                }
            });
    };
    var image1 = "https://s3-media0.fl.yelpcdn.com/bphoto/9OOBQgSAz-IsV0We_faXmQ/o.jpg"
    var image2 = "https://s3-media0.fl.yelpcdn.com/bphoto/9OOBQgSAz-IsV0We_faXmQ/o.jpg"
    var image3 = "https://s3-media0.fl.yelpcdn.com/bphoto/9OOBQgSAz-IsV0We_faXmQ/o.jpg"
    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="absolute" className={clsx(classes.appBar, openDrawer && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    {screenWidth > 500 &&
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, openDrawer && classes.menuButtonHidden)}
                    >
                        <Menu/>
                    </IconButton>}
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        TikTalk
                    </Typography>
                    <Button variant="outlined" className={classes.addSruveyBtn} onClick={handleOpen}>
                        Add a survey
                    </Button>
                    <Button color={'secondary'} onClick={() => app.auth().signOut()}>Sign out</Button>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !openDrawer && classes.drawerPaperClose),
                }}
                open={openDrawer}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </div>
                <Divider/>
                <List>{mainListItems}</List>
                {/*<Divider />*/}
                {/*<List>{secondaryListItems}</List>*/}
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer}/>
                <Container maxWidth="lg" className={classes.container}>
                    {/*<BackgroundSlideshow images={[ image1, image2, image3]} />*/}
                    {/*<Grid container spacing={3}>*/}
                    {/*    <Grid item xs={12} md={8} lg={9}>*/}
                    {/*        <Typography variant={"h5"}> Your Surveys</Typography>*/}
                    {/*        <Paper className={fixedHeightPaper}>*/}
                    {/*            /!*{console.log(fetchedSurveys, 'fetched_lower')}*!/*/}
                    {/*            /!*{fetchedSurveys!==null && <SurveyList surveys={fetchedSurveys}/>}*!/*/}
                    {/*        </Paper>*/}
                    {/*    </Grid>*/}
                    {/*     <Grid item xs={12} md={8} lg={9}>*/}
                    {/*         <Typography variant={"h5"}> Statistics</Typography>*/}
                    {/*        <Paper className={fixedHeightPaper}>*/}
                    {/*            /!*<Deposits />*!/*/}
                    {/*        </Paper>*/}
                    {/*    </Grid>*/}
                    {/*    <Grid item xs={12}>*/}
                    {/*        <Paper className={classes.paper}>*/}
                    {/*            /!*<Orders />*!/*/}
                    {/*        </Paper>*/}
                    {/*    </Grid>*/}
                    {/*</Grid>*/}
                    <Box pt={4}>
                        <Copyright/>
                    </Box>
                </Container>
            </main>
            <AddASurveyCollection
                openModal={openModal}
                handleClose={handleClose}
                handleOpen={handleOpen}
                currentUser={currentUser}
            />
        </div>
    );
}