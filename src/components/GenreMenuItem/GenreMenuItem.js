import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import styles from '../../styles/MovieTheme';

class GenreMenuItem extends Component {
  state = {
    leftoverGenres: null,
  };

  componentDidMount() {
    console.log("Genres Value:", this.props.genresValue);
    console.log("Genres List:", this.props.genresList);
  }

  componentDidUpdate() {
    this.filterGenres();
  }

  filterGenres = () => {

    const leftovers = this.props.genresList.filter(eachGenre =>
      !(this.props.genresValue.includes(eachGenre)));

    this.setState({
      ...this.state,
      leftoverGenres:leftovers,
    })
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <>
      <MenuItem
        disabled={this.props.index === 0}
        selected={this.props.index === this.state.selectedIndex}
        onClick={event => this.handleMenuItemClick(event, this.props.index)}
      >
        {this.props.newGenre}
      </MenuItem>
      </>
    );
  }
}


// mapping the reduxState to props, and checking to see if details have loaded yet
// if they loaded, assign this.props.details to the movie, otherwise return an empty array.
const mapStateToProps = reduxState => ({
  reduxState: reduxState,
  details: ((reduxState.details.length > 0)? reduxState.details[0] : []),
});

// Helps bring in custom Material UI themes
GenreMenuItem.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(connect(mapStateToProps)(GenreMenuItem));


