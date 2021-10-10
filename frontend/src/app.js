import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'fomantic-ui-css/semantic.min.css';
import './styles/styles.scss';

export const store = configureStore();
const state = store.getState();
console.log(state);

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
