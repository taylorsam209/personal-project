import {createStore} from 'redux';
import reducer from './ducks/reducer';
import promiseMiddleware from 'redux-promise-middleware';
import {applyMiddleware} from 'redux';

let createStoreWithMiddleware = applyMiddleware(promiseMiddleware())(createStore)

let store = createStoreWithMiddleware(reducer)

export default store;