import React, { Component } from 'react';
import { connect } from 'react-redux';
import MovieItem from '../MovieItem/MovieItem';
import { Box, Grid, Slide } from '@material-ui/core';
import styles from '../../styles/MovieTheme';


// import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';

class MovieList extends Component {

  componentDidMount(){
    this.props.dispatch({type: 'FETCH_MOVIES'})
  }

  render() {
    // brings in Material UI styles
    const {classes} = this.props;

    return (
      <>
    <Slide direction="left" in={true} timeout={250} mountOnEnter unmountOnExit>

      <Box className={classes.root} component="div">
        <Grid
          container
          direction="column"
          justify="flex-start"
          alignItems="center"
        >
           <Grid item xs={12}>
             {/* map through all the movies */}
             {this.props.reduxState.movies.map( movie =>
             <MovieItem
              key={movie.id}
              history={this.props.history}
              movie={movie}/>)}
           </Grid>
        </Grid>
      </Box>
    </Slide>
      </>
    );
  }
}

MovieList.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = reduxState => ({
  reduxState,
});

export default withStyles(styles)(connect(mapStateToProps)(MovieList));