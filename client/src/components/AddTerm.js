import React, { Component } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'semantic-ui-react';

export default class AddTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: '',
      url: '',
      _term: '',
      date: '',
      category: '',
      definition: '',
      application: '',
      sector: '',
      measure: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
      this.setState({
          [e.target.name]: e.target.value
      });
  };

  handleSubmit(e) {
      console.log(this.state.url);
      axios.post('/api/term/add', {
        uuid: this.state.uuid,
        url: this.state.url,
        _term: this.state._term,
        date: this.state.date,
        category: this.state.category,
        definition: this.state.definition,
        application: this.state.application,
        sector: this.state.sector,
        measure: this.state.measure
      })
      .then(function(response){
          console.log(response)
      })
      .catch(err =>
          console.log(err))
      this.props.history.push('/');
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Content-UUID" name="uuid"   value={this.state.uuid} onChange={this.handleChange}/>
          <input type="text" placeholder="URL" name="url" value={this.state.url} onChange={this.handleChange}/>
          <input type="text" placeholder="Term" name="_term" value={this.state._term} onChange={this.handleChange}/>
          <input type="text" placeholder="Updated-date" name="date" value={this.state.date} onChange={ this.handleChange}/>
          <input type="text" placeholder="Category" name="category" value={this.state.category} onChange={this.handleChange}/>
          <input type="text" placeholder="Term-Definition" name="definition" value={this.state.definition} onChange={this.handleChange}/>
          <input type="text" placeholder="Application" name="application" value={this.state.application} onChange={this.handleChange}/>
          <input type="text" placeholder="Sector" name="sector" value={this.state.sector} onChange={this.handleChange}/>
          <input type="text" placeholder="Unit-of-Measure" name="measure" value={this.state.measure} onChange={this.handleChange}/>
          <Button type="submit" value="Submit">Submit</Button>
        </Form>
      </Container>
    );
  }
}
