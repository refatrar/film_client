import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';


import { fetchStaticData, storeFilmData } from "../actions/FilmAction";
import Button from "@material-ui/core/Button";
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
});

class CreatePost extends Component{
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            description: '',
            release: new Date(),
            date: new Date(),
            rating: '',
            ticket: '',
            price: '',
            country: '',
            photo: '',
            genres: []
        }
    }

    componentDidMount() {
        this.props.fetchStaticData()
    }

    handleSubmit = async (e) => {
        e.persist();
        e.preventDefault()

        let formData = new FormData()
        Object.keys(this.state).forEach(key => {
            if(Array.isArray(this.state[key]) === true){
                for (var i = 0; i < this.state[key].length; i++) {
                    formData.append('genres[]', this.state[key][i].id);
                }
            } else {
                formData.append(key,  this.state[key])
            }
        })

        this.props.storeFilmData(formData);
    }

    render() {
        const { classes } = this.props,
            ticketOptions = [
                {
                    value: 'Available',
                    label: 'Available',
                },
                {
                    value: 'Not Available',
                    label: 'Not Available',
                },
            ]

        return (
            <section className={classes.section}>
                <AppBar />

                <Container className={classes.container} component="main">
                    <CssBaseline />
                    <div className={classes.paper}>
                        <form onSubmit={this.handleSubmit} noValidate autoComplete="off">
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
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
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        multiline
                                        id="description"
                                        label="Description"
                                        onInput={ e => this.setState({description: e.target.value})}
                                        autoFocus
                                        value={this.state.description}
                                        error={this.props.errors.description ? true : false}
                                        helperText={this.props.errors.description ? this.props.errors.description[0] : ''}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        id="release"
                                        label="Release"
                                        type="date"
                                        fullWidth
                                        required
                                        onInput={ e => this.setState({release: e.target.value})}
                                        autoFocus
                                        defaultValue={this.state.release}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        error={this.props.errors.release ? true : false}
                                        helperText={this.props.errors.release ? this.props.errors.release[0] : ''}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        id="date"
                                        label="Date"
                                        type="date"
                                        fullWidth
                                        required
                                        onInput={ e => this.setState({date: e.target.value})}
                                        autoFocus
                                        defaultValue={this.state.date}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        error={this.props.errors.date ? true : false}
                                        helperText={this.props.errors.date ? this.props.errors.date[0] : ''}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="rating"
                                        label="Rating"
                                        onInput={ e => this.setState({rating: e.target.value})}
                                        autoFocus
                                        value={this.state.rating}
                                        error={this.props.errors.rating ? true : false}
                                        helperText={this.props.errors.rating ? this.props.errors.rating[0] : ''}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Autocomplete
                                        id="ticket"
                                        options={ticketOptions}
                                        getOptionLabel={(option) => option.label}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Ticket"
                                                variant="outlined"
                                                error={this.props.errors.ticket ? true : false}
                                                helperText={this.props.errors.ticket ? this.props.errors.ticket[0] : ''}
                                            />
                                        )}
                                        onChange={(event, values) => values ? this.setState({ticket: values.value}) : ''}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <TextField
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        type="number"
                                        id="price"
                                        label="Price"
                                        onInput={ e => this.setState({price: e.target.value})}
                                        autoFocus
                                        value={this.state.price}
                                        error={this.props.errors.price ? true : false}
                                        helperText={this.props.errors.price ? this.props.errors.price[0] : ''}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Autocomplete
                                        id="country"
                                        options={this.props.countries}
                                        getOptionLabel={(option) => option.name}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Country"
                                                variant="outlined"
                                                error={this.props.errors.country ? true : false}
                                                helperText={this.props.errors.country ? this.props.errors.country[0] : ''}
                                            />
                                        )}
                                        onChange={(event, values) => values ? this.setState({country: values.id}) : ''}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <Autocomplete
                                        multiple
                                        id="genres"
                                        options={this.props.genres}
                                        getOptionLabel={option => option.gen_title}
                                        filterSelectedOptions
                                        renderInput={params => (
                                            <TextField
                                                {...params}
                                                error={this.props.errors.genres ? true : false}
                                                helperText={this.props.errors.genres ? this.props.errors.genres[0] : ''}
                                                variant="outlined"
                                                label="Genres"
                                                placeholder=""
                                            />
                                        )}
                                        onChange={(event, values) => values ? this.setState({genres: values}) : ''}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        type="file"
                                        variant="outlined"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="photo"
                                        label="Photo"
                                        // onInput={ e => this.setState({photo: e.target.value})}
                                        autoFocus
                                        defaultValue={''}
                                        error={this.props.errors.photo ? true : false}
                                        helperText={this.props.errors.photo ? this.props.errors.photo[0] : ''}
                                        onInput={e => this.setState({photo: e.target.files[0]})}
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Submit
                            </Button>
                        </form>
                    </div>
                </Container>
            </section>
        )
    }
}

CreatePost.propTypes = {
    fetchStaticData: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    errors: state.films.errors,
    countries: state.films.countries,
    genres: state.films.genres,
})

export default connect(mapStateToProps, { fetchStaticData, storeFilmData })(withStyles(styles)(CreatePost))