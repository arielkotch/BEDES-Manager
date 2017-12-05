import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import SearchTerm from './SearchTerm';
import UpdateTerm from './UpdateTerm';
import AddTerm from './AddTerm';
import ExportToXml from './ExportToXml';
import NewTransform from './NewTransform';
import Login from './Login';
import Signup from './Signup';
import ListTerm from './ListTerm';

export default class Main extends Component {
  render() {
    const checkIfUserLoggedIn = this.props.checkIfUserLoggedIn;
    const authenticated = this.props.authenticated;

    return (
      <main>
        <Switch>
          <Route exact path='/' render={(props) => {
            return <Home {...props} checkIfUserLoggedIn={ checkIfUserLoggedIn } />
          }} />
          <Route exact path='/propose' render={(props) => {
            return <AddTerm {...props} authenticated={ authenticated } />
          }} />
          <Route exact path='/search' render={(props) => {
            return <SearchTerm {...props} authenticated={ authenticated } />
          }} />

          <Route exact path='/update' render={(props) => {
            return <UpdateTerm {...props} authenticated={ authenticated } />
          }} />
          <Route exact path='/export' render={(props) => {
            return <ExportToXml {...props} authenticated={ authenticated } />
          }} />
          <Route exact path='/transform' render={(props) => {
            return <NewTransform {...props} authenticated={ authenticated } />
          }} />
          <Route exact path='/manage' render={(props) => {
            return <ListTerm {...props} authenticated={ authenticated } />
          }} />
          <Route exact path='/login' render={(props) => {
            return <Login {...props} authenticated={ authenticated } />
          }} />
          <Route exact path='/signup' render={(props) => {
            return <Signup {...props} authenticated={ authenticated } />
          }} />
        </Switch>
      </main>
    );
  }
}
