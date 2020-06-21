import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from "@material-ui/core/Container";
import Card from '@material-ui/core/Card';
import {connect} from "react-redux";
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import StarIcon from "@material-ui/icons/Star";
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Box from "@material-ui/core/Box";

import { fetchFlimUseSlug } from "./../actions/FilmAction"
import PropTypes from "prop-types";
import FilmGenre from "./modules/FilmGenre";
import CommentItem from "./modules/CommentItem";
import FilmComment from "./modules/FilmComment";
import history from "../config/history";
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
    },
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%'
    },
    content: {
        flex: '1 0 auto',
        padding: theme.spacing(4)
    },
    cover: {
        width: 350
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(0),
        paddingBottom: theme.spacing(0),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    image: {
        width: '100%'
    },
    button: {
        margin: theme.spacing(3),
    },
    table: {
        minWidth: 700,
    },
    box: {
        margin: theme.spacing(2),
        display: "",
        width: "100%"
    },
});

class FilmView extends Component{
    constructor(props) {
        super(props);

        this.state = {
            token: localStorage.getItem('access_token')
        }

        this.handleSort = this.handleSort.bind(this)
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData(){
        this.props.fetchFlimUseSlug(this.props.match.params.slug)
    }

    handleSort() {
        this.fetchData()
    }

    render() {
        const { classes } = this.props,
            data = this.props.film

        return (
            <section className={classes.section}>
                <AppBar />

                <Container className={classes.container}>
                    <Card className={classes.root}>
                        <div className={classes.details}>
                            <Grid item xs={12} sm container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <CardContent className={classes.content}>
                                        <Typography component="h5" variant="h5">
                                            { data.name }
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            { data.description }
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            <div className={classes.clipRoot}>
                                                {
                                                    data.genres ? data.genres.map((item, key) => <FilmGenre data={item.gener} key={key} />) : ''
                                                }
                                            </div>
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            <strong>Release:</strong> { data.release }
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            <strong>Ticket:</strong> { data.ticket }
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            <strong>Price:</strong> { data.price }
                                        </Typography>
                                        <Typography variant="subtitle1" color="textSecondary">
                                            <strong>Release:</strong> { data.country ? data.country.name : '' }
                                        </Typography>

                                    </CardContent>
                                </Grid>
                                <Grid item>
                                    <Typography variant="subtitle1">
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            color="primary"
                                            className={classes.button}
                                            startIcon={<StarIcon />}
                                        >{ data.rating }</Button>
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Divider className={classes.divider} />
                            <div className={classes.controls}>
                                <Box className={classes.box}>
                                    { data.comments ? data.comments.map((item, key) => <CommentItem data={item} key={key} />) : '' }
                                </Box>
                            </div>

                            {
                                this.state.token ? <FilmComment id={data.id} handleSort={this.handleSort}/> :
                                    <Button className={classes.button} color="inherit"
                                            onClick={() => history.push('/signin')}>Signin</Button>
                            }


                        </div>
                        <CardMedia
                            className={classes.cover}
                            title={ data.name }
                        >
                            <img className={classes.image} src={data.photo} alt={data.name} />
                        </CardMedia>
                    </Card>
                </Container>
            </section>
        )
    }
}

FilmView.propTypes = {
    fetchFlimUseSlug: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    film: state.films.viewFilm
})

export default connect(mapStateToProps, { fetchFlimUseSlug })(withStyles(styles)(FilmView))