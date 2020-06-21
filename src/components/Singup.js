import React, {Component} from 'react';
import { connect } from  'react-redux'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PropTypes from "prop-types";

import { userSignup } from './../actions/FilmAction'
import AppBar from "./modules/Appbar";

const styles = theme => ({
    section: {
        display: 'flex',
        overflow: 'hidden',
    },
    container: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(3),
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paper: {
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class Singup extends Component{
    constructor() {
        super();

        this.state = {
            name: '',
            email: '',
            password: '',
            confirm_password: ''
        }
    }

    handleSubmit = async (e) => {
        e.persist();
        e.preventDefault()

        let formData = new FormData()
        Object.keys(this.state).forEach(key => formData.append(key, this.state[key]))

        await this.props.userSignup(formData)
    }

    render() {
        const { classes } = this.props;

        return (
            <section className={classes.section}>
                <AppBar />

                <Container className={classes.container} component="main" maxWidth="xs">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign Up
                        </Typography>
                        <form onSubmit={this.handleSubmit} className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                onInput={ e => this.setState({name: e.target.value})}
                                autoFocus
                                value={this.state.name}
                                error={this.props.errors.name ? true : false}
                                helperText={this.props.errors.name ? this.props.errors.name[0] : ''}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoComplete="email"
                                onInput={ e => this.setState({email: e.target.value})}
                                autoFocus
                                value={this.state.email}
                                error={this.props.errors.email ? true : false}
                                helperText={this.props.errors.email ? this.props.errors.email[0] : ''}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                onInput={ e => this.setState({password: e.target.value})}
                                autoComplete="current-password"
                                value={this.state.password}
                                error={this.props.errors.password ? true : false}
                                helperText={this.props.errors.password ? this.props.errors.password[0] : ''}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                label="Confirm Password"
                                type="confirm_password"
                                id="confirm_password"
                                onInput={ e => this.setState({confirm_password: e.target.value})}
                                autoComplete="current-password"
                                value={this.state.confirm_password}
                                error={this.props.errors.confirm_password ? true : false}
                                helperText={this.props.errors.confirm_password ? this.props.errors.confirm_password[0] : ''}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>
                        </form>
                    </div>
                </Container>
            </section>
        );
    }
}

Singup.propTypes = {
    userSignup: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    errors: state.films.errors

})

export default connect(mapStateToProps, {userSignup})(withStyles(styles)(Singup))