import React, { Component } from 'react';
import axios from 'axios';
import {
  Container,
  Segment,
  Button
} from 'semantic-ui-react';

import Option from './Option';

export default class Term extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionList: []
    };
  }

  componentDidMount() {
    // check that termData exists
    if (this.props.termData) {
      let optionList = this.props.termData.Options.map((data, index) => {
        return (
          <Option data={data} />
        );
      });
      this.setState({
        optionList: optionList
      });
    }
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
      <Segment.Group>
        <Segment>Content-UUID: {this.props.termData['Content-UUID']}</Segment>
        <Segment>URL: {this.props.termData['URL']}</Segment>
        <Segment>Term: {this.props.termData['Term']}</Segment>
        <Segment>Updated-date: {this.props.termData['Updated-date']}</Segment>
        <Segment>Category: {this.props.termData['Category']}</Segment>
        <Segment>Term-Definition: {this.props.termData['Term-Definition']}</Segment>
        <Segment>Application: {this.props.termData['Application']}</Segment>
        <Segment>Sector: {this.props.termData['Sector']}</Segment>
        <Segment>Unit-of-Measure: {this.props.termData['Unit-of-Measure']}</Segment>
        <Segment>URL: {this.props.termData['URL']}</Segment>
        <Segment>Options:
          {this.state.optionList}
        </Segment>
        <Button onClick={this.handleDeleteButtonClick}>
          Delete Term
        </Button>
      </Segment.Group>
    );
  }
}


//   {
//     this.props.termDataNotFound
//     ?
//       <div className="red-text">Term not found</div>
//     :
//       null
//   }
//   {
//     this.props.termDataDeleted
//     ?
//       <div className="red-text">Term deleted</div>
//     :
//       null
//   }
