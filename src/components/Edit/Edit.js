import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FormControl, Grid, Paper, Slide, TextField, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import styles from '../../styles/MovieTheme';
// import GenreMenu from '../GenreMenu/GenreMenu';

class Edit extends Component {

  // Initialize the state
  state = {
    titleValue: '',
    descriptionValue: '',
    genresValue: [],
    genresList: [],
  }

  // Do stuff as the user arrives
  componentDidMount() {
    this.getDetails();
    this.getGenres();
  }

  // Go back to the details page if they click cancel
  cancelClick = () => {
    this.props.history.push('/details/' + this.props.match.params.id);
  }

  // Setup change handler for the textboxes
  changeHandler = ( propertyName ) => (event) =>{
    console.log(this.state);
    this.setState({
      ...this.state,
      [propertyName]: event.target.value,
    });
  }

  getDetails = () => {
    this.props.dispatch( { type: 'FETCH_DETAILS', payload: this.props.match.params.id} );
  }

  getGenres = () => {
    this.props.dispatch( { type: 'FETCH_GENRES', payload: this.props.match.params.id} );
  }


  // Save the new values unless they are blank, then save the defaults.
  saveClick = () => {
    this.props.dispatch( { type: 'SAVE_DETAILS', payload: {
      id: this.props.match.params.id,
      title: (this.state.titleValue==='' ? this.props.details.title : this.state.titleValue),
      description: (this.state.descriptionValue==='' ? this.props.details.description : this.state.descriptionValue),
    }})
    this.props.history.push('/details/' + this.props.match.params.id);
  }


  render() {
    // brings in Material UI styles
    const {classes} = this.props;

    return (
      <>
        {/* conditional rendering to make sure the details are loaded */}
        {
          ( this.props.details.title !== undefined
            && this.props.reduxState.genres.length > 0 )
        ?
            // render once the details load
          <Slide direction="left" in={true} timeout={370} mountOnEnter unmountOnExit>
            <Paper className={classes.paper} component="div">
              <FormControl
                fullWidth
                component={Grid}
                container
                spacing={1}
              >
                <Grid item>
                  <Grid container>
                    <Grid item
                      component={TextField}
                      variant="outlined"
                      label="Title"
                      onChange={this.changeHandler('titleValue')}
                      defaultValue={this.props.details.title}
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    multiline
                    variant="filled"
                    label="Description"
                    onChange={this.changeHandler('descriptionValue')}
                    defaultValue={this.props.details.description}
                  />
                </Grid>
                <Grid
                  container
                  justify="space-between"
                  align="flex-end"
                  spacing={1}
                  >
                  <Grid item>
                    <Typography variant={'subtitle2'}>
                      {this.props.details.genres.map((genre) =>
                        // conditional rendering to deal with the last entry in the list
                        (this.props.details.genres.indexOf(genre) === this.props.details.genres.length-1)
                      ?
                          // last entry
                          genre + '.'
                      :
                          // not the last entry
                          genre + ', ')}
                    </Typography>
                  </Grid>
                  {/* <Grid item>
                    <GenreMenu
                          genresValue={this.props.details.genres}
                          genresList={this.props.reduxState.genres}
                          /> taco
                  </Grid> */}
                  <Grid item>
                    <Grid
                      container
                      spacing={1}
                      >
                      <Grid item>
                        <Button onClick={this.saveClick} variant={"contained"} color={"primary"}>Save</Button>
                      </Grid>
                      <Grid item>
                        <Button onClick={this.cancelClick} variant={"outlined"} color={"secondary"}>Cancel</Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </FormControl> {/* // end Form Control  */}
            </Paper>
          </Slide>
        :
            // render if the details don't load
          <Typography paragraph>Page is loading please wait...</Typography>
        }
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
Edit.propTypes = {
  classes: PropTypes.object.isRequired
};


export default withStyles(styles)(connect(mapStateToProps)(Edit));