import {createStore} from 'redux';
import reducer from './ducks/reducer';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import {applyMiddleware} from 'redux';

let createStoreWithMiddleware = applyMiddleware(reduxPromiseMiddleware())(createStore)

let store = createStoreWithMiddleware(reducer)

export default store;