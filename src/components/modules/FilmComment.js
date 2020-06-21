import React, {Component} from "react";
import {connect} from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import { userComment } from './../../actions/FilmAction'
import PropTypes from "prop-types";

const styles = theme => ({
    container: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3),
        position: 'relative',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        marginTop: theme.spacing(2),
    }
});

class FilmComment extends Component{
    constructor() {
        super();

        this.state = {
            comment: ''
        }
    }

    handleSubmit = async (e) => {
        e.persist();
        e.preventDefault()

        const data = {
            comment: this.state.comment,
            film_id: this.props.id
        }

        let formData = new FormData()
        Object.keys(data).forEach(key => formData.append(key, data[key]))

        await this.props.userComment(formData, localStorage.getItem('access_token'))

        this.setState({
            comment: ''
        }, () => this.props.handleSort())
    }

    render() {
        const { classes } = this.props

        return (
            <Container className={classes.container}>
                <Grid item xs={12}  md={4} container>
                    <form onSubmit={this.handleSubmit} className={classes.form} noValidate>
                        <TextField
                            id="standard-multiline-static"
                            label="Comment"
                            variant="outlined"
                            multiline
                            required
                            rows={8}
                            fullWidth
                            onInput={ e => this.setState({comment: e.target.value})}
                            autoFocus
                            value={this.state.comment}
                            error={this.props.errors.comment ? true : false}
                            helperText={this.props.errors.comment ? this.props.errors.comment[0] : ''}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Submit
                        </Button>
                    </form>
                </Grid>
            </Container>
        );
    }
}

FilmComment.propTypes = {
    userComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    errors: state.films.errors

})

export default connect(mapStateToProps, { userComment })(withStyles(styles)(FilmComment))