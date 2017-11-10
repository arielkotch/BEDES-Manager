import React, { Component } from 'react';
import axios from 'axios';
import {
  Container,
  Segment
} from 'semantic-ui-react';

export default class Option extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <Container>
        <Segment.Group>
          <Segment>Content-UUID: {this.props.data['Content-UUID']}</Segment>
          <Segment>URL: {this.props.data['URL']}</Segment>
          <Segment>Term: {this.props.data['Term']}</Segment>
          <Segment>Updated-date: {this.props.data['Updated-date']}</Segment>
          <Segment>Related-Term: {this.props.data['Related-Term']}</Segment>
          <Segment>Related-Term-UUID: {this.props.data['Related-Term-UUID']}</Segment>
          <Segment>Option-Definition: {this.props.data['Option-Definition']}</Segment>
          <Segment>Application: {this.props.data['Application']}</Segment>
          <Segment>Sector: {this.props.data['Sector']}</Segment>
          <Segment>Unit-of-Measure: {this.props.data['Unit-of-Measure']}</Segment>
        </Segment.Group>
      </Container>
    );
  }
}
