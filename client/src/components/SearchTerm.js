import React, { Component } from 'react';
import axios from 'axios';
import {
  Container,
  Button,
  Form
} from 'semantic-ui-react';

export default class SearchTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: '',
      term: true,
      termNotFound: false,
      optionList: ''
    };
  }

  componentDidMount() {

  }

  // Handler for uuid search input field
  handleUuidSearchChange = event => this.setState({ uuid: event.target.value });

  // Handler for uuid search submit
  handleUuidSearchSubmit = event => {
    // Save this in variable, self
    const self = this;
    axios.get('/api/term/' + this.state.uuid)
      .then(function(response) {
        console.log(response.data);
        const data = response.data;
        let optionList;
        // Check that response data exists (if term was found with entered uuid)
        if (data) {
          // Create array of option cards
          optionList = data.Options.map((option, index) => {
            return (
              <div className="row" key={index}>
                <div className="col s12">
                  <div className="card-panel">
                    <div>Content-UUID: {option['Content-UUID']}</div>
                    <div>URL: {option['URL']}</div>
                    <div>Term: {option['Term']}</div>
                    <div>Updated-date: {option['Updated-date']}</div>
                    <div>Related-Term: {option['Related-Term']}</div>
                    <div>Related-Term-UUID: {option['Related-Term-UUID']}</div>
                    <div>Option-Definition: {option['Option-Definition']}</div>
                    <div>Application: {option['Application']}</div>
                    <div>Sector: {option['Sector']}</div>
                    <div>Unit-of-Measure: {option['Unit-of-Measure']}</div>
                  </div>
                </div>
              </div>
            );
          });
          self.setState({
            term: data,
            optionList: optionList,
            termNotFound: false
          });
        } else {
          self.setState({
            termNotFound: true
          });
        }


      })
      .catch(function(error) {
        console.log(error);
      });
    // Prevent form default behavior
    event.preventDefault();
  }

  // Delete term onClick
  handleDeleteButtonClick = () => {
    axios.delete('/api/term/delete/' + this.state.term['Content-UUID'])
      .then(function (response) {
        console.log(response);
        this.setState({
          term: false
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleUuidSearchSubmit}>
          <Form.Field>
            <label>Search for term</label>
            <input placeholder='Search for term' onChange={this.handleUuidSearchChange} />
          </Form.Field>
          <Button type='submit'>Search</Button>
        </Form>


      </Container>
    );
  }
}
