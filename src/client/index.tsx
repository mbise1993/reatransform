import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { configureStore } from './app/state';
import AppContainer from './app/AppContainer';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const store = configureStore();

const app = (
  <Provider store={store}>
    <AppContainer />
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
