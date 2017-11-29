import React, { Component } from 'react';
import axios from 'axios';
import { Container, Button, Form, Segment } from 'semantic-ui-react';

export default class ExportToXml extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numTerms: 1,
      termNames: {},
      options: {}
    };
  }

  // handler for add term button
  addTermButtonClick = (event) => {
    let numTermsPlusOne = this.state.numTerms + 1;
    this.setState({
      numTerms: numTermsPlusOne
    });
  };

  // handler for show options button
  optionsButtonClick = (i) => {
    const termName = event.target.value;
    // Save this in variable, self
    const self = this;
    axios.get('/api/option/' + termName)
      .then(function(response) {
        // data is the array of options
        const data = response.data;
        console.log(data);
        // update options object with new options
        const updatedOptions = this.state.options;
        updatedOptions[i] = data;
        // update termNames object with new termName
        const updatedtermNames = this.state.termNames;
        updatedtermNames[i] = termName;
        self.setState({
          options: updatedOptions,
          termNames: updatedtermNames
        })
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    let terms = [];
    for (let i = 0; i < this.state.numTerms; i++) {
      terms.push(
        <Segment key={i}>
          <Form.Field>
            <label>Bedes Term</label>
            <input placeholder='' onChange={ this.handleTermSearchChange }/>
            <Button onClick={() => this.optionsButtonClick(i) }>Options</Button>
          </Form.Field>
        </Segment>
      );
    }

    return (
      <div>
        <Container>
          <Form>
            <Form.Field>
              <label>Implementation Field</label>
              <input placeholder='' />
            </Form.Field>
            <Form.Field>
              <label>Implementation Value</label>
              <input placeholder='' />
            </Form.Field>
            <Form.Field>
              <label>Implementation Units</label>
              <input placeholder='' />
            </Form.Field>
            {terms}
            <Form.Field>
              <Button onClick={ this.addTermButtonClick }>
                Add another term
              </Button>
            </Form.Field>
            <Button type='submit'>Submit</Button>
          </Form>
        </Container>
      </div>
    );
  }
}
