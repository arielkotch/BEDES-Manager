import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: '',
      term: ''
    };
  }

  componentDidMount() {

  }

  handleChange = event => this.setState({ uuid: event.target.value });

  handleSubmit = event => {
    const self = this;
    axios.get('/api/term/' + this.state.uuid)
      .then(function (response) {
        console.log(response.data);
        self.setState({ term: response.data });
      })
      .catch(function (error) {
        console.log(error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input id="seach_term" type="text" className="validate" onChange={this.handleChange} />
              <label htmlFor="search_term">Enter UUID to search</label>
              <div>Content-UUID: {this.state.term['Content-UUID']}</div>
              <div>URL: {this.state.term['URL']}</div>
              <div>Term: {this.state.term['Term']}</div>
              <div>Updated-date: {this.state.term['Updated-date']}</div>
              <div>Category: {this.state.term['Category']}</div>
              <div>Term-Definition: {this.state.term['Term-Definition']}</div>
              <div>Application: {this.state.term['Application']}</div>
              <div>Sector: {this.state.term['Sector']}</div>
              <div>Unit-of-Measure: {this.state.term['Unit-of-Measure']}</div>
              <div>URL: {this.state.term['URL']}</div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
