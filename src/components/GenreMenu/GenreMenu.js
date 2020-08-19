import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, List, ListItem, ListItemText, Menu, MenuItem, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import styles from '../../styles/MovieTheme';
import GenreMenuItem from '../GenreMenuItem/GenreMenuItem';

class GenreMenu extends Component {
  state = {
    anchorEl: null,
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
        <div>
          {/* map through currently selected genres */}
        <List>
          <ListItem
            button
            aria-haspopup="true"
            aria-controls="genre-menu"
            aria-label="When device is locked"
            onClick={this.handleClickListItem}
          >
            <ListItemText
              primary={this.props.genresList[this.state.selectedIndex]}
            />
          </ListItem>
        </List>
        <Menu
          id="genre-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          { (this.state.leftoverGenres === null) ?
          <MenuItem>Error</MenuItem>
          :
          this.state.leftoverGenres.map((newGenre, index) => (
            <GenreMenuItem key={newGenre} newGenre={newGenre} index={index} />
          ))}
        </Menu>
      </div>
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
GenreMenu.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(connect(mapStateToProps)(GenreMenu));