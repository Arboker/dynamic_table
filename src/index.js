import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from "react-redux";
import { rootReducer } from "./store/reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

console.warn = () => {}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);