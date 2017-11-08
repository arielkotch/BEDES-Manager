import React, { Component } from 'react';
import axios from 'axios';

export default class ExportToXml extends Component {

  exportTermButtonClick = () => {
    axios.get('/api/export-terms')
      .then(function (response) {
        // console.log(response);

      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="card-panel">
            <div><a className="waves-effect waves-light btn" onClick={this.exportTermButtonClick}>Terms XML</a></div>
          </div>
        </div>
      </div>
    );
  }
}
