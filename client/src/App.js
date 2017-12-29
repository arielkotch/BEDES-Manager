import React, { Component } from 'react';
import axios from 'axios';
// import './App.css';

import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Main from './components/Main';

class App extends Component {
  constructor(props) {
    super(props);
    // initial active values of menu buttons
    this.state = {
      authenticated: false,
      usertype: '',
      email: ''
    };
  }

  componentDidMount() {
    const self = this;
    // check if user is logged in
    axios.get('/api/user/verify')
      .then(function(res) {
        self.setState({
          authenticated: res.data.authenticated,
          usertype: res.data.usertype,
          email: res.data.email
        })

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  checkIfUserLoggedIn = () => {
    const self = this;
    // check if user is logged in
    axios.get('/api/user/verify')
      .then(function(res) {
        const authenticated = res.data.authenticated;
        const usertype = res.data.usertype;

        self.setState({
          authenticated: authenticated,
          usertype: usertype,
          email: res.data.email
        })

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <TopBar checkIfUserLoggedIn={ this.checkIfUserLoggedIn } authenticated={ this.state.authenticated } usertype={ this.state.usertype } email={ this.state.email }/>
        <Navbar checkIfUserLoggedIn={ this.checkIfUserLoggedIn } authenticated={ this.state.authenticated } usertype={ this.state.usertype } />
        <Main checkIfUserLoggedIn={ this.checkIfUserLoggedIn } authenticated={ this.state.authenticated } />
      </div>
    );
  }
}

export default App;
