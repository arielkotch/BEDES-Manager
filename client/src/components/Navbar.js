import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Menu } from 'semantic-ui-react';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    // initial active values of menu buttons
    this.state = {
      activeStates: {
        homeActive: true,
        searchActive: false,
        addActive: false,
        updateActive: false,
        exportActive: false,
        loginActive: false,
        signupActive: false
      },
      authenticated: false
    };
  }

  componentDidMount() {
    const self = this;
    // check if user is logged in
    axios.get('/api/user/verify')
      .then(function(res) {
        console.log("###");
        console.log(res)
        self.setState({
          authenticated: res.data.authenticated
        })

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // handle navbar buttons to change active state to clicked button
  handleNavbarButtonClick = event => {
    let activeStates = this.state.activeStates;
    // reset all active states to false
    for (let prop in activeStates) {
      activeStates[prop] = false;
    }
    // set currently clicked button to true
    activeStates[event.target.id + 'Active'] = true;
    this.setState(activeStates);
  };

  render() {
    const { authenticated } = this.state;
    if (authenticated) {
      return (
        <Menu inverted>
          <Container>
            <Menu.Item header onClick={ this.handleNavbarButtonClick } name="asdf">
              Bedes Manager
            </Menu.Item>
            <Menu.Item as={ Link } to='/' active={ this.state.homeActive } onClick={ this.handleNavbarButtonClick } id="home">Home</Menu.Item>
            <Menu.Item as={ Link } to='/search' active={ this.state.searchActive } onClick={ this.handleNavbarButtonClick } id="search">Search</Menu.Item>
            <Menu.Item as={ Link } to='/add' active={ this.state.addActive } onClick={ this.handleNavbarButtonClick } id="add">Add</Menu.Item>
            <Menu.Item as={ Link } to='/update' active={ this.state.updateActive } onClick={ this.handleNavbarButtonClick } id="update">Update</Menu.Item>
            <Menu.Item as={ Link } to='/export' active={ this.state.exportActive } onClick={ this.handleNavbarButtonClick } id="export">Export</Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item>
                <Button as={ Link } to='/signup' active={ this.state.signupActive } onClick={ this.handleNavbarButtonClick } id="signup" primary>Sign Up</Button>
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
      );
    }

    return (
      <Menu inverted>
        <Container>
          <Menu.Item header onClick={ this.handleNavbarButtonClick } name="asdf">
            Bedes Manager
          </Menu.Item>
          <Menu.Item as={ Link } to='/' active={ this.state.homeActive } onClick={ this.handleNavbarButtonClick } id="home">Home</Menu.Item>
          <Menu.Item as={ Link } to='/search' active={ this.state.searchActive } onClick={ this.handleNavbarButtonClick } id="search">Search</Menu.Item>
          <Menu.Item as={ Link } to='/add' active={ this.state.addActive } onClick={ this.handleNavbarButtonClick } id="add">Add</Menu.Item>
          <Menu.Item as={ Link } to='/update' active={ this.state.updateActive } onClick={ this.handleNavbarButtonClick } id="update">Update</Menu.Item>
          <Menu.Item as={ Link } to='/export' active={ this.state.exportActive } onClick={ this.handleNavbarButtonClick } id="export">Export</Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item className='item'>
              <Button as={ Link } to='/login' active={ this.state.loginActive } onClick={ this.handleNavbarButtonClick } id="login">Log in</Button>
            </Menu.Item>
            <Menu.Item>
              <Button as={ Link } to='/signup' active={ this.state.signupActive } onClick={ this.handleNavbarButtonClick } id="signup" primary>Sign Up</Button>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}
