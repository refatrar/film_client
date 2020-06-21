import React, {Component} from 'react';
import { withStyles } from "@material-ui/core/styles";

import Routes from "./config/Routes";
import {connect} from "react-redux";

const styles = theme => ({
    root: {
        display: 'flex',
        overflow: 'hidden',
    },
});

class App extends Component{
    render() {
        const { classes } = this.props

        return (
            <div className="App">
                <Routes />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userinfo: state.films.userData,

})

export default connect(mapStateToProps)(withStyles(styles)(App));
