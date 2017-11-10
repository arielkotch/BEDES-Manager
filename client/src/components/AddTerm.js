import React, { Component } from 'react';
import axios from 'axios';

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

  handleChange(e, _state) {
      this.setState({
          [_state]: e.target.value
      });
  };

  handleSubmit(e) {
      e.preventDefault();
      axios.post('http://localhost:5000/api/term/add/', {
        'Content-UUID': this.state.uuid,
        'URL': this.state.url,
        'Term': this.state._term,
        'Updated-date': this.state.date,
        'Category': this.state.category,
        'Term-Definition': this.state.definition,
        'Application': this.state.application,
        'Sector': this.state.sector,
        'Unit-of-Measure': this.state.measure
      })
      .then(res =>
          console.log(res)
      )
      .catch(err =>
          console.log(err))

      this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <div className="card-panel">
          Please fill the following form below to add your term.
        </div>
          <div className="row">
            <div className="input-field col s12">
                <div className="row">
                  <div className="col s12">
                        <form className="col s12" onSubmit={this.handleSubmit}>
                          <input type="text" placeholder="Content-UUID" name="uuid" value={this.state.uuid} onChange={(e) => this.handleChange(e, 'uuid') }/>
                          <input type="text" placeholder="URL" name="url" value={this.state.url} onChange={(e) => this.handleChange(e, 'url') }/>
                          <input type="text" placeholder="Term" name="_term" value={this.state._term} onChange={(e) => this.handleChange(e, '_term') }/>
                          <input type="text" placeholder="Updated-date" name="date" value={this.state.date} onChange={(e) => this.handleChange(e, 'date') }/>
                          <input type="text" placeholder="Category" name="category" value={this.state.category} onChange={(e) => this.handleChange(e, 'category') }/>
                          <input type="text" placeholder="Term-Definition" name="definition" value={this.state.definition} onChange={(e) => this.handleChange(e, 'definition') }/>
                          <input type="text" placeholder="Application" name="application" value={this.state.application} onChange={(e) => this.handleChange(e, 'application') }/>
                          <input type="text" placeholder="Sector" name="sector" value={this.state.sector} onChange={(e) => this.handleChange(e, 'sector') }/>
                          <input type="text" placeholder="Unit-of-Measure" name="measure" value={this.state.measure} onChange={(e) => this.handleChange(e, 'measure') }/>
                          <input type="submit" value="Submit" className="waves-effect waves-light btn"/>
                        </form>
                      </div>
                </div>
            </div>
          </div>
      </div>
    );
  }
}
