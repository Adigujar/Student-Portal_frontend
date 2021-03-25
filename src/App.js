import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/Login'
import Portal from './components/portal'


import './App.css';

function App(props) {

  return (
    <Router>
        <Switch>
            <Route exact path='/' render = {(props) => {
                return (
                    <Login />
                );
            }} />
            <Route exact path='/delete' render = {(props) => {
                return (
                    <Portal />
                )
            }} />
            
            
        </Switch>
    </Router>
);
  
}

export default App;