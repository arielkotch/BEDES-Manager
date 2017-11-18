import React, { Component } from 'react';
import axios from 'axios';
import { Container, Button, Form, Checkbox } from 'semantic-ui-react';

import Term from './SearchTerm/Term';

export default class SearchTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      termData: {},
      termFound: false,
      searchType: 'keyword'
    };
  }

  // Handler for search input field
  // Set query state to user typed query
  handleKeywordSearchChange = event => {
    this.setState({ query: event.target.value });
  }

  // Handler for search submit
  handleKeywordSearchSubmit = event => {
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

  onSearchByKeywordButtonClick = () => {
    this.setState({
      searchType: 'keyword'
    });
  }

  onSearchByCategoryButtonClick= () => {
    this.setState({
      searchType: 'category'
    });
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
        <Button onClick={ this.onSearchByKeywordButtonClick }>
          Search with keyword/uuid
        </Button>
        <Button onClick={ this.onSearchByCategoryButtonClick }>
          Search by category
        </Button>
        {
          this.state.searchType === 'keyword' ?
            <Form onSubmit={ this.handleKeywordSearchSubmit }>
              <Form.Field>
                <label>Search for term</label>
                <input placeholder='Search for term' onChange={ this.handleKeywordSearchChange } />
              </Form.Field>
              <Button type='submit'>Search</Button>
            </Form>
          :
          <Form onSubmit={ this.handleCategorySearchSubmit }>
            <Form.Field>
              <label>Categories</label>
              <Checkbox label='Contact' />
              <Checkbox label='Controls and Operations' />
              <Checkbox label='Emissions' />
              <Checkbox label='Envelope' />
              <Checkbox label='Generation and Storage Equipment' />
              <Checkbox label='Global Terms' />
              <Checkbox label='HVAC' />
              <Checkbox label='Loads' />
              <Checkbox label='Measures' />
              <Checkbox label='Metadata' />
              <Checkbox label='Premises' />
              <Checkbox label='Resource' />
              <Checkbox label='Resources' />
              <Checkbox label='Units' />
              <Checkbox label='Waste' />
            </Form.Field>
            <Button type='submit'>Search</Button>
          </Form>
        }

        { this.state.termFound ?  terms : null }
      </Container>
    );
  }
}
