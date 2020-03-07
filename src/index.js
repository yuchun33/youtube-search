import React from "react";
import ReactDOM from 'react-dom'
import App from './App.js'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import yotubeResearchApp from './reducers'
import thunk from 'redux-thunk'

let store = createStore(yotubeResearchApp, applyMiddleware(thunk))
ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
,document.getElementById('root'))