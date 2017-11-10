import React, { Component } from 'react';
import axios from 'axios';
import {
  Container,
  Segment,
  Button
} from 'semantic-ui-react';

export default class Term extends Component {
  constructor(props) {
    super(props);
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
          <Segment>Options: </Segment>
          <Button onClick={this.handleDeleteButtonClick}>
            Delete Term
          </Button>
        </Segment.Group>
      </Container>
    );
  }
}


// <div class="row">
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
//   <div className="col s12">
//     <div className="card-panel">
//       <div>Content-UUID: {this.props.termData['Content-UUID']}</div>
//       <div>URL: {this.props.termData['URL']}</div>
//       <div>Term: {this.props.termData['Term']}</div>
//       <div>Updated-date: {this.props.termData['Updated-date']}</div>
//       <div>Category: {this.props.termData['Category']}</div>
//       <div>Term-Definition: {this.props.termData['Term-Definition']}</div>
//       <div>Application: {this.props.termData['Application']}</div>
//       <div>Sector: {this.props.termData['Sector']}</div>
//       <div>Unit-of-Measure: {this.props.termData['Unit-of-Measure']}</div>
//       <div>URL: {this.props.termData['URL']}</div>
//       <div>Options: {this.state.optionList}</div>
//       <a className="waves-effect waves-light btn" onClick={this.handleDeleteButtonClick}>Delete Term</a>
//     </div>
//   </div>
// </div>
