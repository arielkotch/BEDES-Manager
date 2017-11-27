import React, { Component } from 'react';
import axios from 'axios';
import { Container, Form, Table, Label } from 'semantic-ui-react';

export default class ListTerm extends Component {
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentWillMount(){
    axios.get('/api/term/proposed/all')
    .then(response => {
      this.setState({

      });
    })
    .catch(error => {
      console.log(error);
    })
  }

  render() {
    return(
      <Container>
        <Form>
          <Form.Field>
            <label>All Proposed Terms</label>
          </Form.Field>
        </Form>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>No.</Table.HeaderCell>
              <Table.HeaderCell>UUID</Table.HeaderCell>
              <Table.HeaderCell>Term</Table.HeaderCell>
              <Table.HeaderCell>Term</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        <Table.Body>
        </Table.Body>
        </Table>
      </Container>
    );
  }
}
