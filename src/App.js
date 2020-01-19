import React from 'react';
import Dashboard from './Dashboard'
import {BrowserRouter as Router, Route} from "react-router-dom";
import Login from "./Login";
import SignUp2 from "./SignUp2";
import {AuthProvider} from "./Auth";
import PrivateRoute from "./PrivateRoute";
import {createMuiTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { ThemeProvider } from '@material-ui/core/styles';
import MyGallery from "./ImageGalery";


const App = () => {

    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    primary: {
                        // light: will be calculated from palette.primary.main,
                        main: '#0066ff',
                        // dark: will be calculated from palette.primary.main,
                        // contrastText: will be calculated to contrast with palette.primary.main
                    },
                    secondary: {
                        main: '#ff9800'
                    }
                },
            }),
    );

    return (
        <ThemeProvider theme={theme}>
            <AuthProvider>
                <Router>
                    <div>
                        {/*<PrivateRoute exact path="/" component={Dashboard}/>*/}
                        {/*<Route exact path="/signup" component={SignUp2}/>*/}
                        {/*<Route exact path="/login" component={Login}/>*/}
                        <Route exact path="/" component={Dashboard}/>
                        <Route exact path="/slideshow" component={MyGallery}/>
                    </div>
                </Router>
            </AuthProvider>
        </ThemeProvider>
    )
};

export default App;