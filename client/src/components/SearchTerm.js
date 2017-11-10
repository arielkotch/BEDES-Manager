import React, { Component } from 'react';
import axios from 'axios';

export default class SearchTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: '',
      term: true,
      termNotFound: false,
      optionList: ''
    };
  }

  componentDidMount() {

  }

  // Handler for uuid search input field
  handleUuidSearchChange = event => this.setState({ uuid: event.target.value });

  // Handler for uuid search submit
  handleUuidSearchSubmit = event => {
    // Save this in variable, self
    const self = this;
    axios.get('/api/term/' + this.state.uuid)
      .then(function(response) {
        console.log(response.data);
        const data = response.data;
        let optionList;
        // Check that response data exists (if term was found with entered uuid)
        if (data) {
          // Create array of option cards
          optionList = data.Options.map((option, index) => {
            return (
              <div className="row" key={index}>
                <div className="col s12">
                  <div className="card-panel">
                    <div>Content-UUID: {option['Content-UUID']}</div>
                    <div>URL: {option['URL']}</div>
                    <div>Term: {option['Term']}</div>
                    <div>Updated-date: {option['Updated-date']}</div>
                    <div>Related-Term: {option['Related-Term']}</div>
                    <div>Related-Term-UUID: {option['Related-Term-UUID']}</div>
                    <div>Option-Definition: {option['Option-Definition']}</div>
                    <div>Application: {option['Application']}</div>
                    <div>Sector: {option['Sector']}</div>
                    <div>Unit-of-Measure: {option['Unit-of-Measure']}</div>
                  </div>
                </div>
              </div>
            );
          });
          self.setState({
            term: data,
            optionList: optionList,
            termNotFound: false
          });
        } else {
          self.setState({
            termNotFound: true
          });
        }


      })
      .catch(function(error) {
        console.log(error);
      });
    // Prevent form default behavior
    event.preventDefault();
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
      <div>
        <div class="row">
          <form className="col s12" onSubmit={this.handleUuidSearchSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input id="seach_term" type="text" className="validate" onChange={this.handleUuidSearchChange} />
                <label htmlFor="search_term">Enter UUID to search</label>
              </div>
            </div>
          </form>
        </div>
        <div class="row">
          {
            this.state.termNotFound
            ?
              <div className="red-text">Term not found</div>
            :
              null
          }
          {
            this.state.termDeleted
            ?
              <div className="red-text">Term deleted</div>
            :
              null
          }
          <div className="col s12">
            <div className="card-panel">
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
              <div>Options: {this.state.optionList}</div>
              <a className="waves-effect waves-light btn" onClick={this.handleDeleteButtonClick}>Delete Term</a>
            </div>
          </div>
        </div>
        <div class="row">
          <form className="col s12" onSubmit={this.handleSubmit}>
            <div className="row">
              <div className="input-field col s12">
                <input id="search_keyword" type="text" className="validate" onChange={this.handleChange} />
                <label htmlFor="search_keyword">Enter keyword</label>
              </div>
            </div>
            <div className="row">
              
            </div>
          </form>
        </div>
      </div>
    );
  }
}
