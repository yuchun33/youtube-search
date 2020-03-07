import React, {Component} from 'react';
import {hot} from "react-hot-loader";
import Main from './containers/main.js'

class App extends Component{
    render(){
        return(
            <Main/>
        )
    }
}

export default hot(module)(App)