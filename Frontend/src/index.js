import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from "redux";
import myReducer from "./components/redux-files/reducer";
import thunk  from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

//render App component on the root element
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
      myReducer,
      composeWithDevTools(applyMiddleware(thunk))
    );
console.log("storee");
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
