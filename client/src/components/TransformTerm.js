import React, { Component } from 'react';
import axios from 'axios';
import { Container, Button, Form, Segment, Dropdown } from 'semantic-ui-react';

export default class ExportToXml extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numTerms: 1,
      termNames: {},
      allTermOptions: {},
      pickedOptions: {},
      bedesCompositeTerm: ''
    };
  }

  // handler for term input
  handleTermInputChange = (i, e) => {
    const termName = e.target.value;
    // update termNames object with new termName
    const updatedtermNames = this.state.termNames;
    updatedtermNames[i] = termName;
    this.setState({
      termNames: updatedtermNames
    })
  }

  // hanlder for option dropdown change
  handleOptionDropdownChange = (i, e, data) => {
    console.log(data.value);
    const pickedOption = data.value;
    // update pickedOptions object with new picked optionSchema
    const updatedpickedOptions = this.state.pickedOptions;
    updatedpickedOptions[i] = pickedOption;
    this.setState({
      pickedOptions: updatedpickedOptions
    })
  };

  // handler for add term button
  addTermButtonClick = () => {
    let numTermsPlusOne = this.state.numTerms + 1;
    this.setState({
      numTerms: numTermsPlusOne
    });
  };

  // handler for show options button
  optionsButtonClick = (i) => {
    if (!this.state.termNames[i]) {
      console.log('No term input');
      return;
    }
    const termName = this.state.termNames[i];
    // Save this in variable, self
    const self = this;
    axios.get('/api/options/' + termName)
      .then(function(response) {
        // data is the array of options
        const data = response.data;
        console.log(data);
        // update options object with new options
        const updatedOptions = self.state.allTermOptions;
        updatedOptions[i] = data;

        self.setState({
          allTermOptions: updatedOptions,
        })
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // handler for submit button click
  submitButtonClick = () => {
    let compositeTerm = '';
    console.log(this.state.pickedOptions)
    const pickedOptions = this.state.pickedOptions;
    for (let i = 0; i < this.state.numTerms; i++) {
      if (pickedOptions.hasOwnProperty(i)) {
        compositeTerm += pickedOptions[i] + ' ';
      }
    }

    this.setState({
      bedesCompositeTerm: compositeTerm
    });
  };

  render() {
    let terms = [];
    for (let i = 0; i < this.state.numTerms; i++) {
      let termOptions = this.state.allTermOptions[i];
      // if options exist, create a dropdown input
      let options;
      // make sure termOptions is an array
      if (Array.isArray(termOptions)) {
        const optionNames = termOptions.map((e, i) => {
          return {
            key: e.Term + '_' + i,
            value: e.Term,
            text: e.Term
          };
        });
        options = <Dropdown
                    placeholder='Select Option'
                    fluid search selection
                    options={optionNames}
                    onChange={ (e, data) => this.handleOptionDropdownChange(i, e, data) }
                  />;
      }

      terms.push(
        <Segment key={i}>
          <Form.Field>
            <label>Bedes Term</label>
            <input placeholder='' onChange={ (e) => this.handleTermInputChange(i, e) }/>
            <Button onClick={() => this.optionsButtonClick(i) }>Options</Button>
            { options }
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
            <Button onClick={ this.submitButtonClick }>Submit</Button>
          </Form>
          <p>{ this.state.bedesCompositeTerm }</p>
        </Container>
      </div>
    );
  }
}
