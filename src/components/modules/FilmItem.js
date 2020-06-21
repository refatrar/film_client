import React, {Component} from "react";
import { Link } from "react-router-dom"
import { withStyles, withTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import StarIcon from '@material-ui/icons/Star';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

import FilmGenre from "./FilmGenre";

const styles = theme => ({
    root: {
        display: 'flex',
        height: "100%",
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 38,
        width: 38,
    },
    clipRoot: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.2),
        },
    },
    button: {
        margin: theme.spacing(1),
    }
})

class FilmItem extends Component{
    render() {
        const { classes } = this.props,
            data = this.props.data

        return (
            <Grid item xs={12} md={4}>
                <Link to={{
                    pathname: `/films/${data.slug}`,
                    state: {
                        data: data
                    }
                }}>
                    <Card className={classes.root}>
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography component="h5" variant="h5">
                                    { data.name }
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    <div className={classes.clipRoot}>
                                    {
                                        data.genres.map((item, key) => <FilmGenre data={item.gener} key={key} />)
                                    }
                                    </div>
                                </Typography>
                            </CardContent>
                            <div className={classes.controls}>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="primary"
                                    className={classes.button}
                                    startIcon={<StarIcon />}
                                >{ data.rating }</Button>
                                <Button
                                    size="small"
                                    variant="outlined"
                                    color="primary"
                                    className={classes.button}
                                    startIcon={<QuestionAnswerIcon />}
                                >{ data.comments_count }</Button>
                            </div>
                        </div>
                        <CardMedia
                            className={classes.cover}
                            image={`${data.photo}`}
                            title="Live from space album cover"
                        />
                    </Card>
                </Link>
            </Grid>
        )
    }
}

export default withStyles(styles)(withTheme(FilmItem))