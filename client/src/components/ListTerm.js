import React, { Component } from 'react';
import axios from 'axios';
import { Container, Form, Table } from 'semantic-ui-react';
import ProposedTable from './ListTerm/ProposedTable';

export default class ListTerm extends Component {
  constructor(props){
    super(props);
    this.state = {
      termData : []
    }
  }

  componentWillMount() {
    const self = this;

// redirect if not authenticated
    axios.get('/api/user/verify')
      .then(function(res) {
        const authenticated = res.data.authenticated;
        const usertype = res.data.usertype;
        if (!authenticated) {
          self.props.history.push('/');
        }
        // if not admin, redirect to /
        if (usertype !== 'admin') {
          self.props.history.push('/');
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get('/api/term/proposed/all')
    .then(response => {
      this.setState({
        termData: response.data
      });
    })
    .catch(error => {
      console.log(error);
    })
  }

  proposedTable(){
    if(this.state.termData instanceof Array){
      return this.state.termData.map(function(obj,i){
        return <ProposedTable obj={obj} key={i} />;
      })
    }
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
              <Table.HeaderCell>Updated-Date</Table.HeaderCell>
              <Table.HeaderCell>URL</Table.HeaderCell>
              <Table.HeaderCell>Term</Table.HeaderCell>
              <Table.HeaderCell>Category</Table.HeaderCell>
              <Table.HeaderCell>Definition</Table.HeaderCell>
              <Table.HeaderCell>Application</Table.HeaderCell>
              <Table.HeaderCell>Sector</Table.HeaderCell>
              <Table.HeaderCell>Measure</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
        <Table.Body>
          {this.proposedTable()}
        </Table.Body>
        </Table>
      </Container>
    );
  }
}
