import React, { Component } from 'react';
import axios from 'axios';
import { Container, Form, Button } from 'semantic-ui-react';

export default class AddTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      term: '',
      category: '',
      definition: '',
      application: '',
      sector: '',
      measure: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
  }

  handleChange(e) {
      this.setState({
          [e.target.name]: e.target.value
      });
  };

  handleSubmit(e) {
      console.log(this.state.url);
      axios.post('/api/term/proposed/add', {
        url: this.state.url,
        term: this.state.term,
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
          <Form.Field>
            <label>Propose a Term</label>
            <input type="text" placeholder="URL" name="url" value={this.state.url} onChange={this.handleChange}/>
            <input type="text" placeholder="Term" name="term" value={this.state.term} onChange={this.handleChange}/>
            <input type="text" placeholder="Category" name="category" value={this.state.category} onChange={this.handleChange}/>
            <input type="text" placeholder="Term-Definition" name="definition" value={this.state.definition} onChange={this.handleChange}/>
            <input type="text" placeholder="Application" name="application" value={this.state.application} onChange={this.handleChange}/>
            <input type="text" placeholder="Sector" name="sector" value={this.state.sector} onChange={this.handleChange}/>
            <input type="text" placeholder="Unit-of-Measure" name="measure" value={this.state.measure} onChange={this.handleChange}/>
            <Button type="submit" value="Submit">Submit</Button>
          </Form.Field>
        </Form>
      </Container>
    );
  }
}
