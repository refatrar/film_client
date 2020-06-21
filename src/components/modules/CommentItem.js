import React from "react";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const CommentItem = (props) => {
    return (
        <Box width={1} bgcolor="grey.300" p={1} my={0.5}>
            <Typography component="h6" variant="h6">
                { props.data.user.name }
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" paragraph>
                {props.data.created_at}
            </Typography>
            <Typography variant="subtitle1" paragraph>
                {props.data.comment}
            </Typography>
        </Box>
    )
}

export default CommentItem