import React from 'react'
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import SearchTerm from './SearchTerm';
import UpdateTerm from './UpdateTerm';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/search' component={SearchTerm}/>
      <Route exact path='/update' component={UpdateTerm}/>
    </Switch>
  </main>
);

export default Main;
