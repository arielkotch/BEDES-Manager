import React, { Component } from 'react';

import { Container } from 'semantic-ui-react';

export default class Home extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.checkIfUserLoggedIn();
  }

  render() {
    return (
      <Container>
        <p>A project to ease the management of the management of terms in the Building Energy Data Exchange Standard dictionary.</p>
      </Container>
    );
  }
}
