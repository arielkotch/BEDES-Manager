import React, { Component } from 'react';
import axios from 'axios';
// import './App.css';

import Navbar from './components/Navbar';
import Main from './components/Main';

class App extends Component {
  constructor(props) {
    super(props);
    // initial active values of menu buttons
    this.state = {
      authenticated: false
    };
  }

  componentDidMount() {
    const self = this;
    // check if user is logged in
    axios.get('/api/user/verify')
      .then(function(res) {
        self.setState({
          authenticated: res.data.authenticated
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
        self.setState({
          authenticated: res.data.authenticated
        })

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="App">
        <Navbar checkIfUserLoggedIn={ this.checkIfUserLoggedIn }  authenticated={ this.state.authenticated } />
        <Main checkIfUserLoggedIn={ this.checkIfUserLoggedIn } />
      </div>
    );
  }
}

export default App;
