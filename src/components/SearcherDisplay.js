import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        maxWidth: 345,
    },
    media: {
        height: 260,
    },
};

const SearcherDisplay = ({ product = {}, classes }) => {
    return (
        <Card className={classes.card} >
            <CardActionArea >
                <CardMedia
                    className={classes.media}
                    image={product.largeImage}
                    title="imagen"
                    alt = 'imagen'
                />
                <CardContent style={{ height: 160 }}>
                    <Typography gutterBottom variant="h5" >
                        {product.productDisplayName[0]}
                    </Typography>
                    <Typography component="h3">
                        $ {product.listPrice}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

SearcherDisplay.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearcherDisplay);