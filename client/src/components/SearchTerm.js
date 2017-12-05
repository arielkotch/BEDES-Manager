import React, { Component } from 'react';
import axios from 'axios';
import { Container, Button, Form, Checkbox, Dropdown, Segment } from 'semantic-ui-react';

import FoundTerms from './SearchTerm/FoundTerms';

export default class SearchTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allTermNames: [],
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

  componentDidMount() {
    const self = this;
    // get list of term names
    axios.get('/api/term/allnames/')
      .then(function(response) {
        const data = response.data;
        self.setState({
          allTermNames: data,
        })
      })
      .catch(function(error) {
        console.log(error);
      });
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
    axios.get('/api/term/search/exact-term-name/' + query)
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

  // handler for term input
  handleTermDropDownChange = (e, data) => {
    const query = data.value;
    this.setState({
      query: query
    });
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
    const allTermNames = this.state.allTermNames;

    return (
      <Container>
        <Button onClick={ this.onSearchByKeywordButtonClick }>
          Search by Term
        </Button>
        <Button onClick={ this.onSearchByCategoryButtonClick }>
          Search by Category
        </Button>
        <br/>
        <br/>
        {
          this.state.searchType === 'keyword' ?
            <Segment>
              <label>Search for Term</label>
              <Dropdown
                placeholder='Search Term'
                fluid search selection
                options={allTermNames}
                onChange={ this.handleTermDropDownChange }
              />
            </Segment>
          :
          <Form >
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
            <Button onClick={ this.handleCategorySearchSubmit }>Search</Button>
          </Form>
        }

        { this.state.termFound ?  <FoundTerms termData={ termData } /> : null }
      </Container>
    );
  }
}
