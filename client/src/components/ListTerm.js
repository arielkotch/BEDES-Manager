import React, { Component } from 'react';
import axios from 'axios';
import { Container, Form, Table } from 'semantic-ui-react';

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
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Definition</Table.HeaderCell>
              <Table.HeaderCell>Application</Table.HeaderCell>
              <Table.HeaderCell>Sector</Table.HeaderCell>
              <Table.HeaderCell>Unit</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        <Table.Body>
        </Table.Body>
        </Table>
      </Container>
    );
  }
}
