import React, { Component } from 'react';
// import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// import PropTypes from 'prop-types';
// import { withStyles } from 'material-ui/styles';
// const styles = theme => ({
//   root: {
//     //
//   },
//   flex: {
//     flex: 1
//   }
// })

class _template extends Component {
  // Renders the entire app on the DOM
  render() {
    // brings in Material UI styles
    // const {classes} = this.props;

    return (
      <>
      <Box className="_template" component="div">
        <p>Empty Page</p>
      </Box>
      </>
    );
  }
}


// _template.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(_template);