import React from 'react'
import { Switch, Route } from 'react-router-dom';

import Home from './Home';
import SearchTerm from './SearchTerm';
import UpdateTerm from './UpdateTerm';
import AddTerm from './AddTerm';
import ExportToXml from './ExportToXml';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route exact path='/add' component={AddTerm}/>
      <Route exact path='/search' component={SearchTerm}/>
      <Route exact path='/update' component={UpdateTerm}/>
      <Route exact path='/export' component={ExportToXml}/>
    </Switch>
  </main>
);

export default Main;
