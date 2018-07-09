/* @flow */

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';
import registerServiceWorker from './registerServiceWorker';

const root = document.getElementById('root');
if (root == null) throw new Error('Can not start the app without a place to render it.');

const store = createStore(reducer);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  root
);
registerServiceWorker();
