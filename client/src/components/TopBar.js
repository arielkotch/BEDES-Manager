import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import axios from 'axios';
import { Button, Container, Grid, Menu, Dropdown } from 'semantic-ui-react';

class TopBar extends Component {

  handleLogoutButtonClick = event => {

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
    const email = this.props.email;
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

          <Dropdown text={ email } style={{ color: 'white', marginLeft: 'auto', marginRight: 'auto' }}>
            <Dropdown.Menu>
              <Button onClick={ this.handleLogoutButtonClick } id="logout" primary
                style={{ color: 'white', marginLeft: 'auto', marginRight: 'auto' }}
              >Logout</Button>
            </Dropdown.Menu>
          </Dropdown>

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
