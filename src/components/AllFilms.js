import React, { Component } from "react"
import PropTypes from 'prop-types'
import { connect } from  'react-redux'
import { withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from '@material-ui/core/Grid';
import Pagination from "react-js-pagination";

import 'bootstrap/dist/css/bootstrap.min.css';

import { fetchFilmData } from './../actions/FilmAction'
import FilmItem from "./modules/FilmItem";
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    grid: {
        marginBottom: theme.spacing(3)
    }
});

class AllFilms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activePage: 1,
            totalFilm: 0,
            limit: Number(process.env.REACT_APP_LIMIT)
        }
    }

    componentDidMount() {
        const query = new URLSearchParams(this.props.location.search);
        this.fetchData(Number(query.get('page')))
    }

    async fetchData(page) {
        const params = {
            page: page ? page : this.state.activePage,
            limit: this.state.limit
        }

        await this.props.fetchFilmData(params)
    }

    handlePageChange(pageNumber) {
        this.fetchData(pageNumber)
        history.push(`/?page=${pageNumber}`)
    }

    render() {
        const { classes } = this.props;

        return (
            <section className={classes.section}>
                <AppBar />

                <Container className={classes.container}>

                    <Grid container className={classes.grid} spacing={3}>
                        {
                            this.props.films.data.map((item, key) => <FilmItem data={item} key={key} />)
                        }
                    </Grid>

                    <Pagination
                        itemClass="page-item"
                        linkClass="page-link"
                        activePage={this.props.films.current_page}
                        itemsCountPerPage={this.state.limit}
                        totalItemsCount={this.props.films.total}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange.bind(this)}
                    />
                </Container>
            </section>
        )
    }
}

AllFilms.propTypes = {
    fetchFilmData: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    films: state.films.filmData,
    totalFilm: state.films.totalFilm,
    totalPage: state.films.totalPage,
    activePage: state.films.activePage

})

export default connect(mapStateToProps, {fetchFilmData})(withStyles(styles)(AllFilms))