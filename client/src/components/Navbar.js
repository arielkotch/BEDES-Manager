import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeActive: 'active',
      aboutActive: '',
    };
  }

  componentDidMount() {
  }

  homeClicked = () => {
    this.setState({
      homeActive: 'active',
      aboutActive: '',
    });
  }

  aboutClicked = () => {
    this.setState({
      homeActive: '',
      aboutActive: 'active',
    });
  }

  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="nav-wrapper container">
            <a className="brand-logo">Bedes Manager</a>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li className={this.state.homeActive}>
                <Link to='/' onClick={this.homeClicked}>Home</Link>
              </li>
              <li className={this.state.aboutActive}>
                <Link to='/about' onClick={this.aboutClicked}>About</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
