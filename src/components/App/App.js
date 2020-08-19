import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'fontsource-roboto';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { HashRouter as Router, Route, Link } from 'react-router-dom';

// import modules for routes
import MovieList from '../MovieList/MovieList';
import Details from '../Details/Details';
import Edit from '../Edit/Edit';

class App extends Component {
  // Renders the entire app on the DOM
  render() {
    return (
      <>
        <CssBaseline />
        <Container className="App">
          <Router>
            <nav>
              <Link to = "/">
                <Button color="primary"> Home </Button>
              </Link>
            </nav>

            <Typography paragraph>Movie Database App</Typography>
              <div>
                <Route exact path="/" component={MovieList} />
                <Route exact path="/details/:id" component={Details} />
                <Route path="/edit/:id" component={Edit} />
              </div>
          </Router>
        </Container>
      </>
    );
  }
}

export default App;

