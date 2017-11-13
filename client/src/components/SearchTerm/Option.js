import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

export default class Option extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <Segment.Group>
        <Segment>Content-UUID: {this.props.optionData['Content-UUID']}</Segment>
        <Segment>URL: {this.props.optionData['URL']}</Segment>
        <Segment>Term: {this.props.optionData['Term']}</Segment>
        <Segment>Updated-date: {this.props.optionData['Updated-date']}</Segment>
        <Segment>Related-Term: {this.props.optionData['Related-Term']}</Segment>
        <Segment>Related-Term-UUID: {this.props.optionData['Related-Term-UUID']}</Segment>
        <Segment>Option-Definition: {this.props.optionData['Option-Definition']}</Segment>
        <Segment>Application: {this.props.optionData['Application']}</Segment>
        <Segment>Sector: {this.props.optionData['Sector']}</Segment>
        <Segment>Unit-of-Measure: {this.props.optionData['Unit-of-Measure']}</Segment>
      </Segment.Group>
    );
  }
}
