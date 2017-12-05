import React, { Component } from 'react';
import axios from 'axios';
import { Container, Button, Form, Segment, Dropdown, Input } from 'semantic-ui-react';

import TransformsAccordian from './NewTransform/TransformsAccordian';
// import BedesTermInput from './BedesTermInput';

export default class NewTransform extends Component {
  constructor(props) {
    super(props);

    // each picked bedes term will have this object format
    // let bedesTerm = {
    //   bedesTerm: '',
    //   valueMapping: '',
    //   bedesUnit: '',
    //   unitConversion: ''
    // };

    // initial states
    this.state = {
      allTermNames: [],
      allTermOptions: {},
      numTerms: 1,
      newTransform: {
        transformName: '',
        implementationField: '',
        implementationValue: '',
        implementationUnits: '',
        bedesCompositeFieldName: ''
      },
      bedesTerms: {},
      valueMappings: {},
      valueTerm: '',
      valueTermTransform: {},
      newTransforms: [],
      transformsAccordianShown: false
    };
  }

  componentDidMount() {
    const self = this;

    // redirect if not authenticated
    axios.get('/api/user/verify')
      .then(function(res) {
        const authenticated = res.data.authenticated;
        if (!authenticated) {
          self.props.history.push('/')
        }
      })
      .catch(function (error) {
        console.log(error);
      });

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

  // shouldComponentUpdate(nextProps, nextState) {
  //   return this.state.bedesTerms !== nextState.bedesTerms;
  // }

  handleTransformNameChange = (e, data) => {
    const stateProp = data.name;
    const value = data.value;

    this.setState({
      newTransform: {
        ...this.state.newTransform,
        [stateProp]: [value]
      }
    });
  }

  // show options when term is selected
  showOptions = (i) => {
    if (!this.state.bedesTerms[i]) {
      console.log('No term input');
      return;
    }
    const termName = this.state.bedesTerms[i];
    // Save this in variable, self
    const self = this;
    axios.get('/api/options/' + termName)
      .then(function(response) {
        // data is the array of options
        const data = response.data;
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

  // handler for term input
  handleTermDropDownChange = (i, e, data) => {
    const termName = data.value;

    const updatedTermNames = this.state.bedesTerms;
    updatedTermNames[i] = termName;
    this.setState({
      bedesTerms: updatedTermNames
    });
    // Show options
    this.showOptions(i);
  }

  // handler for option dropdown change
  handleOptionDropdownChange = (i, e, data) => {
    const pickedOption = data.value;
    // update valueMappings object with new picked optionSchema
    const updatedvalueMappings = this.state.valueMappings;
    updatedvalueMappings[i] = pickedOption;
    this.setState({
      valueMappings: updatedvalueMappings
    })
  };

  // handler for add term button
  addTermButtonClick = () => {
    let numTermsPlusOne = this.state.numTerms + 1;
    this.setState({
      numTerms: numTermsPlusOne
    });
  };

  // remove term input Field
  removeTermButtonClick = (i) => {

  }

  // Handler for term related to value input field
  // Set valueTerm state to the term that the user picked
  handleValueTermChange = (e, data) => {
    // set valueTerm to input value
    this.setState({
      valueTerm: data.value
    });
  }

  // handler for creatge new transform button click
  createNewTransformButtonClick = () => {
    // Get input values from refs
    const transformName = this.refs.transformName.state.value[0];
    const implementationField = this.refs.implementationField.state.value[0];
    const implementationValue = this.refs.implementationValue.state.value[0];
    const implementationUnits = this.refs.implementationUnits.state.value[0];

    let newTransforms = [];

    const bedesTerms = this.state.bedesTerms;
    const valueMappings = this.state.valueMappings;
    const bedesUnits = '';
    const unitConversion = '';
    const valueTerm = this.state.valueTerm;

    // construct bedes composite field name
    let bedesCompositeFieldName = '';
    for (let i = 0; i < this.state.numTerms; i++) {
      bedesCompositeFieldName += valueMappings[i] + ' ';
    }
    // Add bedes term related to value at the end of the compoisite term
    bedesCompositeFieldName += valueTerm;

    // create array of new transforms, one for each selected bedes term
    for (let i = 0; i < this.state.numTerms; i++) {
      if (valueMappings.hasOwnProperty(i) && bedesTerms.hasOwnProperty(i)) {
        newTransforms.push({
          'Transform Name': transformName,
          'Implementation Field': implementationField,
          'Implmentation Value': implementationValue,
          'Implmentation Units': implementationUnits,
          'BEDES Term': bedesTerms[i],
          'Value Mapping': valueMappings[i],
          'BEDES Unit': bedesUnits,
          'Unit Conversion': unitConversion,
          'BEDES Composite Field Name': bedesCompositeFieldName
        });
      }
    }

    const bedesTerm = this.state.valueTerm;
    // transform for value bedes term
    const valueTermTransform = {
      'Transform Name': transformName,
      'Implementation Field': implementationField,
      'Implmentation Value': implementationValue,
      'Implmentation Units': implementationUnits,
      'BEDES Term': bedesTerm,
      'Value Mapping': implementationValue,
      'BEDES Unit': bedesUnits,
      'Unit Conversion': unitConversion,
      'BEDES Composite Field Name': bedesCompositeFieldName
    };

    this.setState({
      newTransforms: newTransforms,
      valueTermTransform: valueTermTransform,
      transformsAccordianShown: true
    });
  };

  render() {
    // get all term names to use for dropdown search input box
    const allTermNames = this.state.allTermNames;

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
            <Dropdown
              placeholder='Search Term'
              fluid search selection
              options={allTermNames}
              onChange={ (e, data) => this.handleTermDropDownChange(i, e, data) }
            />
            { options }
            {
              this.state.valueMappings[i]
              ?
                <Button onClick={ this.addTermButtonClick }>Add another term</Button>
              :
                null
            }
            <Button onClick={() => this.removeTermButtonClick(i) }>Remove Term</Button>
          </Form.Field>
        </Segment>
      );
    }

    return (
      <div>
        <Container>
          <Form>
            <Form.Field>
              <label>Transform Name</label>
              <FormInput ref='transformName' />
            </Form.Field>
            <Form.Field>
              <label>Implementation Field</label>
              <FormInput ref='implementationField' />
            </Form.Field>
            <Form.Field>
              <label>Implementation Value</label>
              <FormInput ref='implementationValue' />
            </Form.Field>
            <Form.Field>
              <label>Implementation Units</label>
              <FormInput ref='implementationUnits' />
            </Form.Field>
            { terms }

            <Form.Field>
              <label>Bedes Term Related to Value</label>
              <Dropdown
                placeholder='Search for bedes term related to value'
                fluid search selection
                options={allTermNames}
                onChange={ this.handleValueTermChange }
              />
            </Form.Field>
            <Button onClick={ this.createNewTransformButtonClick }>Create New Transform</Button>
          </Form>
          {
            this.state.transformsAccordianShown
            ?
              <Segment>
                <p>Transforms: </p>
                <TransformsAccordian newTransformsData={this.state.newTransforms} valueTermTransformData={this.state.valueTermTransform} />
              </Segment>
            :
              null
          }
        </Container>
      </div>
    );
  }
}

// this is used so input value changes don't have to rerender the entire NewTransform
class FormInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    }
  }

  inputChange = (e, data) => {
    this.setState({
      value: [data.value]
    });
  }

  render() {
    return (
      <Input
        placeholder=''
        value={ this.state.value }
        onChange={ this.inputChange }
      />
    );
  }
}
