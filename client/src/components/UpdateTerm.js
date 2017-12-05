import React, { Component } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';

export default class UpdateTerm extends Component {

  componentDidMount() {
    const self = this;

    // redirect if not authenticated
    axios.get('/api/user/verify')
      .then(function(res) {
        const authenticated = res.data.authenticated;
        if (!authenticated) {
          self.props.history.push('/')
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {

    return (
      <Container>
        <p>Update term</p>
      </Container>
    );
  }
}
