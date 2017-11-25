import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import SearchTerm from './SearchTerm';
import UpdateTerm from './UpdateTerm';
import AddTerm from './AddTerm';
import ExportToXml from './ExportToXml';
import Login from './Login';
import Signup from './Signup';
import ListTerm from './ListTerm';

export default class Main extends Component {
  render() {
    let checkIfUserLoggedIn = this.props.checkIfUserLoggedIn
    return (
      <main>
        <Switch>
          <Route exact path='/' render={(props) => {
            return <Home {...props} checkIfUserLoggedIn={ checkIfUserLoggedIn } />
          }}
          />
          <Route exact path='/add' component={AddTerm}/>
          <Route exact path='/search' component={SearchTerm}/>
          <Route exact path='/update' component={UpdateTerm}/>
          <Route exact path='/export' component={ExportToXml}/>
          <Route exact path='/list' component={ListTerm}/>
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
        </Switch>
      </main>
    );
  }
}
