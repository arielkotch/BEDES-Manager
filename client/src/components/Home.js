import React, { Component } from 'react';

import { Container } from 'semantic-ui-react';

export default class Home extends Component {
  // constructor(props) {
  //   super(props);
  // }

  componentDidMount() {
    this.props.checkIfUserLoggedIn();
  }

  render() {
    return (
      <Container>
        <div className="ui grid container">
          <div className="row">
            <div className="column">
              <h1 className="ui header">Bedes Manager</h1>
            </div>
          </div>
          <div className="row">
            <div className="column">
              <div className="ui message">
                  <p>A project to ease the management of terms in the Building Energy Data Exchange Standard dictionary.</p>
                  <h3>Source Code</h3>
                  <a href="https://github.com/Maalka/BEDES-Manager">github.com/Maalka/BEDES-Manager</a>
                  <h3>BEDES Dictionary</h3>
                  <a href="https://bedes.lbl.gov/bedes-online">bedes.lbl.gov/bedes-online</a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }
}
