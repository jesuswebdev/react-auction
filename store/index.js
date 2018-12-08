import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import { combineReducers } from 'redux';
import userReducer from './user/reducer';

export const reducers = combineReducers({
  user: userReducer
});

export const initializeStore = (initialState = {}) => {
  if (typeof(window) === 'object') {
    let user = JSON.parse(window.localStorage.getItem('user'));
    if (user) {
      initialState = { user };
    }
  }
  return createStore(reducers, initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)))
}
