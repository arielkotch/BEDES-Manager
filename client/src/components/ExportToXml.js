import React, { Component } from 'react';
import axios from 'axios';
import { Container, Button } from 'semantic-ui-react';

export default class ExportToXml extends Component {

  exportTermButtonClick = () => {
    axios.get('/api/term/export')
      .then(function (response) {
        // console.log(response);

      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <Container>
        <Button onClick={this.exportTermButtonClick}>
          Export to XML
        </Button>
      </Container>
    );
  }
}
