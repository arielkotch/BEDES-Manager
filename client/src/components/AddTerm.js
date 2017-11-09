import React, { Component } from 'react';
import axios from 'axios';

export default class AddTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: '',
      url: '',
      term: '',
      date: '',
      category: '',
      definition: '',
      application: '',
      sector: '',
      measure: ''
    };
  }

  handleSubmit(e) {
      var _this = this;
      axios.post('http:localhost:5000/api/term/add/', {
          'Content-UUID': _this.uuid.value,
          'URL': _this.url.value,
          'Term': _this.term.value,
          'Updated-date': _this.date.value,
          'Category': _this.category.value,
          'Term-Definition': _this.definition.value,
          'Application': _this.application.value,
          'Sector': _this.sector.value,
          'Unit-of-Measure': _this.measure.value
      })
      .then(res =>
          console.log(res)
      )
      .catch(err => {
          console.log(err)
      })
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
                          <input type="text" placeholder="Content-UUID" name="uuid" ref={uuid => this.uuid = uuid} />
                          <input type="text" placeholder="URL" name="url" ref={url => this.url = url}/>
                          <input type="text" placeholder="Term" name="term" ref={term => this.term = term}/>
                          <input type="text" placeholder="Updated-date" name="date" ref={date => this.date = date}/>
                          <input type="text" placeholder="Category" name="category" ref={category => this.category = category}/>
                          <input type="text" placeholder="Term-Definition" name="definition" ref={definition => this.definition = definition}/>
                          <input type="text" placeholder="Application" name="application" ref={application => this.application = application}/>
                          <input type="text" placeholder="Sector" name="sector" ref={sector => this.sector = sector}/>
                          <input type="text" placeholder="Unit-of-Measure" name="measure" ref={measure => this.measure = measure}/>
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
