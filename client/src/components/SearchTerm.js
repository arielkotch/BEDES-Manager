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
      searchType: 'keyword',
      categories: {
        'Contact': false,
        'Controls and Operations': false,
        'Emissions': false,
        'Envelope': false,
        'Generation and Storage Equipment': false,
        'Global Terms': false,
        'HVAC': false,
        'Loads': false,
        'Measures': false,
        'Metadata': false,
        'Premises': false,
        'Resource': false,
        'Resources': false,
        'Units': false,
        'Waste': false
      }
    };
  }

  // button to toggle keyword search
  onSearchByKeywordButtonClick = () => {
    this.setState({
      searchType: 'keyword'
    });
  }

  // button to toggle category search
  onSearchByCategoryButtonClick= () => {
    this.setState({
      searchType: 'category'
    });
  }

  // Handler for search input field
  // Set query state to user typed query
  handleKeywordSearchChange = event => {
    this.setState({ query: event.target.value });
  }

  handleCheckboxClick = name => {
    // get true or false value of category
    let val = this.state.categories[name];
    // set the boolean value to be the opposite of current bool value
    this.setState({
      categories: {
        ...this.state.categories,
        [name]: !val
      }
    });
  }

  // Handler for search submit
  handleKeywordSearchSubmit = event => {
    // Save this in variable, self
    const self = this;
    const { query } = this.state;
    axios.get('/api/term/search/' + query)
      .then(function(response) {
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

  // button for searching by category
  handleCategorySearchSubmit = event => {
    const categories = this.state.categories;
    // Save this in variable, self
    const self = this;
    axios.get('/api/term/search/category', {
        params: categories
      })
      .then(function(response) {
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
              <Checkbox label='Contact' onClick={ () => this.handleCheckboxClick('Contact') } />
              <Checkbox label='Controls and Operations' onClick={ () => this.handleCheckboxClick('Controls and Operations') } />
              <Checkbox label='Emissions' onClick={ () => this.handleCheckboxClick('Emissions') } />
              <Checkbox label='Envelope' onClick={ () => this.handleCheckboxClick('Envelope') } />
              <Checkbox label='Generation and Storage Equipment' onClick={ () => this.handleCheckboxClick('Generation and Storage Equipment') } />
              <Checkbox label='Global Terms' onClick={ () => this.handleCheckboxClick('Global Terms') } />
              <Checkbox label='HVAC' onClick={ () => this.handleCheckboxClick('HVAC') } />
              <Checkbox label='Loads' onClick={ () => this.handleCheckboxClick('Loads') } />
              <Checkbox label='Measures' onClick={ () => this.handleCheckboxClick('Measures') } />
              <Checkbox label='Metadata' onClick={ () => this.handleCheckboxClick('Metadata') } />
              <Checkbox label='Premises' onClick={ () => this.handleCheckboxClick('Premises') } />
              <Checkbox label='Resource' onClick={ () => this.handleCheckboxClick('Resource') } />
              <Checkbox label='Resources' onClick={ () => this.handleCheckboxClick('Resources') } />
              <Checkbox label='Units' onClick={ () => this.handleCheckboxClick('Units') } />
              <Checkbox label='Waste' onClick={ () => this.handleCheckboxClick('Waste') } />
            </Form.Field>
            <Button type='submit'>Search</Button>
          </Form>
        }

        { this.state.termFound ?  terms : null }
      </Container>
    );
  }
}
