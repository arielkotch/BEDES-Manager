import React, { Component } from 'react';
import axios from 'axios';

export default class AddTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleSubmit(e, data) {
      axios.post('/api/term/add', {
        term: data
      })
      .then(res =>
        this.setState({
          term: res.data
      }))
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
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="input-field col s12">
                <div className="row">
                  <div className="col s12">
                    <div className="card-panel">
                      <div>Term:
                          <input for="Term"/>
                      </div>
                      <div>Term-Definition:
                          <input for="Term-Definition"/>
                      </div>
                      <div>Content-UUID:
                          <input for="UUID"/>
                      </div>
                      <div>URL:
                          <input for="URL"/>
                      </div>
                      <div>Date-Uploaded:
                          <input for="Updated-date"/>
                      </div>
                      <div>Category:
                          <input for="Category"/>
                      </div>
                      <div>Application:
                          <input for="Application"/>
                      </div>
                      <div>Sector:
                          <input for="Sector"/>
                      </div>
                      <div>Unit of Measure:
                          <input for="Unit-of-Measure"/>
                      </div>
                      <a className="waves-effect waves-light btn">Add</a>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
