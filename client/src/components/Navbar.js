import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      homeActive: 'active',
      searchActive: '',
      updateActive: '',
    };
  }

  componentDidMount() {
  }

  homeClicked = () => {
    this.setState({
      homeActive: 'active',
      searchActive: '',
      updateActive: '',
    });
  }

  searchClicked = () => {
    this.setState({
      homeActive: '',
      searchActive: 'active',
      updateActive: '',
    });
  }

  updateClicked = () => {
    this.setState({
      homeActive: '',
      searchActive: '',
      updateActive: 'active',
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
              <li className={this.state.searchActive}>
                <Link to='/search' onClick={this.searchClicked}>Search</Link>
              </li>
              <li className={this.state.searchActive}>
                <Link to='/update' onClick={this.updateClicked}>Update</Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
