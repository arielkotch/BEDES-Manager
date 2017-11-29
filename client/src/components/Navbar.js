import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';
import { Button, Container, Menu } from 'semantic-ui-react';

class Navbar extends Component {
  constructor(props) {
    super(props);
    // initial active values of menu buttons
    this.state = {
      activeStates: {
        homeActive: true,
        searchActive: false,
        addActive: false,
        listActive: false,
        updateActive: false,
        exportActive: false,
        transformActive: false,
        loginActive: false,
        signupActive: false,
        logoutActive: false
      }
    };
  }

  // componentWillReceiveProps() {
  //   this.setState({
  //     authenticated: this.props.authenticated
  //   });
  // }

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

  handleLogoutButtonClick = event => {
    let activeStates = this.state.activeStates;
    // reset all active states to false
    for (let prop in activeStates) {
      activeStates[prop] = false;
    }
    // set currently clicked button to true
    activeStates[event.target.id + 'Active'] = true;
    this.setState(activeStates);

    const self = this;
    // check if user is logged in
    axios.get('/api/user/logout')
      .then(function(res) {
        console.log(res.data);
        self.props.checkIfUserLoggedIn();
        self.props.history.push('/');
      })
      .catch(function (error) {
        console.log(error);
      });


  };

  render() {
    const authenticated = this.props.authenticated;
    if (authenticated) {
      // show a different nav bar if logged in
      const usertype = this.props.usertype;
      // invert navbar colors if normal user
      let inverted = true;
      // don't invert navbar colors if admin
      if (usertype === 'admin') {
        inverted = false;
      }
      return (
        <Menu inverted={ inverted }>
          <Container>
            <Menu.Item as={ Link } to='/' header onClick={ this.handleNavbarButtonClick } name="asdf">
              Bedes Manager
            </Menu.Item>
            <Menu.Item as={ Link } to='/search' active={ this.state.searchActive } onClick={ this.handleNavbarButtonClick } id="search">Search</Menu.Item>
            <Menu.Item as={ Link } to='/add' active={ this.state.addActive } onClick={ this.handleNavbarButtonClick } id="add">Add</Menu.Item>
            <Menu.Item as={ Link } to='/list' active={ this.state.listActive } onClick={ this.handleNavbarButtonClick } id="list">List</Menu.Item>
            <Menu.Item as={ Link } to='/update' active={ this.state.updateActive } onClick={ this.handleNavbarButtonClick } id="update">Update</Menu.Item>
            <Menu.Item as={ Link } to='/export' active={ this.state.exportActive } onClick={ this.handleNavbarButtonClick } id="export">Export</Menu.Item>
            <Menu.Item as={ Link } to='/transform' active={ this.state.transformActive } onClick={ this.handleNavbarButtonClick } id="export">Transform Term</Menu.Item>
            <Menu.Menu position='right'>
              <Menu.Item>
                <Button active={ this.state.logoutActive } onClick={ this.handleLogoutButtonClick } id="logout" primary>Logout</Button>
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
      );
    }

    return (
      <Menu inverted>
        <Container>
          <Menu.Item as={ Link } to='/' header onClick={ this.handleNavbarButtonClick } name="asdf">
            Bedes Manager
          </Menu.Item>
          <Menu.Item as={ Link } to='/search' active={ this.state.searchActive } onClick={ this.handleNavbarButtonClick } id="search">Search</Menu.Item>
          <Menu.Item as={ Link } to='/add' active={ this.state.addActive } onClick={ this.handleNavbarButtonClick } id="add">Add</Menu.Item>
          <Menu.Item as={ Link } to='/list' active={ this.state.listActive } onClick={ this.handleNavbarButtonClick } id="list">List</Menu.Item>
          <Menu.Item as={ Link } to='/update' active={ this.state.updateActive } onClick={ this.handleNavbarButtonClick } id="update">Update</Menu.Item>
          <Menu.Item as={ Link } to='/export' active={ this.state.exportActive } onClick={ this.handleNavbarButtonClick } id="export">Export</Menu.Item>
          <Menu.Item as={ Link } to='/transform' active={ this.state.transformActive } onClick={ this.handleNavbarButtonClick } id="export">Transform Term</Menu.Item>
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

// Create a new component that is "connected" to the router.
export default withRouter(Navbar)
