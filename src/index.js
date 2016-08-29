import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers/rootReducer.js';
import App from './components/AstronautApp.js';

const store = createStore(rootReducer, applyMiddleware(thunk));
//Needed for React Developer Tools
window.React = React;

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
  document.getElementById('root')
);
