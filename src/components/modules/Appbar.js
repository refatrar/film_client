import React, {Component} from "react"
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import history from "../../config/history";
import {connect} from "react-redux";
import Link from '@material-ui/core/Link';

const styles = theme => ({
    appbar: {
      height: 60
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    button: {
        color: "white"
    }
});

class Appbar extends Component{
    constructor(props) {
        super(props);

        this.state = {
            username: localStorage.getItem('user_name'),
            token: localStorage.getItem('access_token')
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('Appbar', prevProps, this.props, localStorage.getItem('access_token'))
    }

    async handleLogout() {
        localStorage.clear()
        history.push('/')
    }

    render() {
        const { classes } = this.props

        return (
            <AppBar className={classes.appbar} positio="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        <Link className={classes.button} onClick={() => history.push('/')}>Films</Link>
                    </Typography>
                    <Button className={classes.button} color="inherit" onClick={() => history.push('/create-post')}>Add Post</Button>
                    {
                        this.state.token ? (
                            <Button color="inherit" className={classes.button} onClick={() => this.handleLogout()}>Logout</Button>
                        ) : (
                            <>
                                <Button className={classes.button} color="inherit" onClick={() => history.push('/signin')}>Signin</Button>
                                <Button color="inherit" className={classes.button} onClick={() => history.push('/signup')}>Signup</Button>
                            </>
                        )
                    }

                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = state => ({
    userinfo: state.films.userData,

})

// const AdaptiveHeader = withRouter(Appbar)

export default connect(mapStateToProps)(withStyles(styles)(Appbar))