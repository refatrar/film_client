import React from "react";
import Chip from '@material-ui/core/Chip';

const FilmGenre = (props) => {
    return (
        <Chip
            label={props.data.gen_title}
            clickable
            color="primary"
            variant="outlined"
        />
    );
}

export default FilmGenre