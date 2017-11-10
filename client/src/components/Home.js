import React, { Component } from 'react';
import axios from 'axios';
import {
  Container
} from 'semantic-ui-react';

export default class Home extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Container>
        <p>A project to ease the management of the management of terms in the Building Energy Data Exchange Standard dictionary.</p>
      </Container>
    );
  }
}
