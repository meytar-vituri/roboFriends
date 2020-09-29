import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect} from 'react-redux';
import {createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger';
import './index.css';
import 'tachyons';
import * as serviceWorker from './serviceWorker';
import App from './containers/App';
import {searchRobots} from './reducers';

const logger = createLogger();
const store = createStore(searchRobots, applyMiddleware(logger));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

