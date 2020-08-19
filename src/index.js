import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import App from './components/App/App.js';
import registerServiceWorker from './registerServiceWorker';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';

// Import saga and related middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';


// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchMovies );
  yield takeEvery('FETCH_DETAILS', fetchDetails );
  yield takeEvery('FETCH_GENRES', fetchGenres );
  yield takeEvery('SAVE_DETAILS', putDetails );
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to get details about specific movies from the server
function* fetchDetails(action) {
  try{
    const response = yield axios.get('/details/' + action.payload);
    yield put({type: 'SET_DETAILS', payload: response.data});
  }catch (error){
    console.log('Problem getting movies from server', error);
  }
}

// Used to get an array of all genres
function* fetchGenres() {
  try{
    const response = yield axios.get('/genres');
    yield put({type: 'SET_GENRES', payload: response.data});
  }catch (error){
    console.log('Problem getting movies from server', error);
  }
}

// Used to get movies from the server
function* fetchMovies() {
  try{
    const response = yield axios.get('/movies');
    yield put({type: 'SET_MOVIES', payload: response.data});
  }catch (error){
    console.log('Problem getting movies from server', error);
  }
}

// Used to update details about a specific movie from the server
// Then updates the details stored on client side
function* putDetails(action) {
  try{
    yield axios.put('/details/' + action.payload.id, action.payload);
    const response = yield axios.get('/details/' + action.payload.id);
    yield put({type: 'SET_DETAILS', payload: response.data});
  }catch (error){
    console.log('Problem getting movies from server', error);
  }
}



// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
}

// Used to store the junction table returned from the server
const details = (state = [], action) => {
  switch (action.type) {
    case 'SET_DETAILS':
      return action.payload;
    default:
      return state;
  }
}

// Used to store the movie genres
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
}

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    details,
    genres,
    movies,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(<Provider store={storeInstance}><App /></Provider>,
    document.getElementById('root'));
registerServiceWorker();
