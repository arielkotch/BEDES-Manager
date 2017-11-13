import React, { Component } from 'react';
import axios from 'axios';
import { Container, Button, Form } from 'semantic-ui-react';

import Term from './SearchTerm/Term';

export default class SearchTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      termData: {},
      termFound: false,
    };
  }

  // Handler for search input field
  // Set query state to user typed query
  handleSearchChange = event => {
    this.setState({ query: event.target.value });
  }

  // Handler for search submit
  handleSearchSubmit = event => {
    // Save this in variable, self
    const self = this;
    const { query } = this.state;
    axios.get('/api/term/search/' + query)
      .then(function(response) {
        // console.log(response.data);
        const data = response.data;
        // check if term was found
        if (data) {
          self.setState({
            termData: data,
            termFound: true
          });
        } else {
          self.setState({
            termFound: false
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    // Prevent form default behavior
    event.preventDefault();
  }

  render() {
    const termData = this.state.termData;
    // terms variable will hold jsx for rendering terms
    let terms;
    // check if multiple terms were found
    if (termData.length > 1) {
      terms = termData.map((data, index) => {
        return <Term termData={data} key={index} />
      });
    } else {
      terms = <Term termData={this.state.termData} />;
    }

    return (
      <Container>
        <Form onSubmit={ this.handleSearchSubmit }>
          <Form.Field>
            <label>Search for term</label>
            <input placeholder='Search for term' onChange={ this.handleSearchChange } />
          </Form.Field>
          <Button type='submit'>Search</Button>
        </Form>
        { this.state.termFound ?  terms : null }
      </Container>
    );
  }
}
