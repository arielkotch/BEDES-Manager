import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';
import { Button, Container, Menu } from 'semantic-ui-react';

class TopBar extends Component {

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
            <Menu.Menu position='right'>
              <Menu.Item>
                <Button onClick={ this.handleLogoutButtonClick } id="logout" primary>Logout</Button>
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>
      );
    }

    return (
      <Menu inverted>
        <Container>
        </Container>
      </Menu>
    );
  }
}

// Create a new component that is "connected" to the router.
export default withRouter(TopBar)
