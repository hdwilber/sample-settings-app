import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.css'
import App from './App';

import { Provider } from 'react-redux'
import store from './redux/configureStore'

import './sass/index.scss'

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>), 
  document.getElementById('root')
);
