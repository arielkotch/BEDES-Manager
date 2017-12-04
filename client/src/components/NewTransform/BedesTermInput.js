import React, { Component } from 'react';
import axios from 'axios';
import { Segment, Button, Form, Dropdown } from 'semantic-ui-react';


export default class BedesTermInput extends Component {
  constructor(props) {
    super(props);

    // initial states
    this.state = {
      allTermNames: [],
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
              this.state.pickedOptions[i]
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
      <Form.Field>
        <label>Bedes Term Related to Value</label>
        <Dropdown
          placeholder='Search for bedes term related to value'
          fluid search selection
          options={allTermNames}
          onChange={ this.handleValueTermChange }
        />
      </Form.Field>
    );
  }
}
