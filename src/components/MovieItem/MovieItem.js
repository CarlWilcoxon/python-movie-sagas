import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Box, Paper, Typography } from '@material-ui/core/';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import styles from '../../styles/MovieTheme';


class MovieItem extends Component {


  // Setup the click handler
  clickHandler = () => {;
    // Take the user to the corresponding details page
    this.props.history.push('/details/' + this.props.movie.id);
  }

  // Renders this component
  render() {

    // brings in Material UI styles
    const {classes} = this.props;

    return (
      <>
      <Paper className={classes.paper} component="div" >
      <Box>
        <img
        src={this.props.movie.poster}
        style={{ cursor: 'pointer '}}
        onClick={this.clickHandler}
        alt={this.props.movie.title + ' poster'} />
        <Typography paragraph variant="caption">{this.props.movie.title}</Typography>
      </Box>
        <p>{this.props.movie.description}</p>
      </Paper>
      </>
    );
  }
}

MovieItem.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = reduxState => ({
  reduxState,
});

export default withStyles(styles)(connect(mapStateToProps)(MovieItem));
