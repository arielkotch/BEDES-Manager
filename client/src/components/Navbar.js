import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
} from 'semantic-ui-react';

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    // initial active values of menu buttons
    this.state = {
      homeActive: true,
      searchActive: false,
      addActive: false,
      updateActive: false,
      exportActive: false,
    };
  }

  // when home button is clicked, set homeActive to true and everything else to false.
  // this is for setting the active property of the menu buttons
  homeClicked = () => {
    this.setState({
      homeActive: true,
      searchActive: false,
      addActive: false,
      updateActive: false,
      exportActive: false,
    });
  }

  searchClicked = () => {
    this.setState({
      homeActive: false,
      searchActive: true,
      addActive: false,
      updateActive: false,
      exportActive: false,
    });
  }

  addClicked = () => {
    this.setState({
      homeActive: false,
      searchActive: false,
      addActive: true,
      updateActive: false,
      exportActive: false,
    });
  }

  updateClicked = () => {
    this.setState({
      homeActive: false,
      searchActive: false,
      addActive: false,
      updateActive: true,
      exportActive: false,
    });
  }

  exportClicked = () => {
    this.setState({
      homeActive: false,
      searchActive: false,
      addActive: false,
      updateActive: false,
      exportActive: true,
    });
  }

  render() {
    return (
      <Menu inverted>
        <Container>
          <Menu.Item as='a' header>
            Bedes Manager
          </Menu.Item>
          <Menu.Item as={ Link } to='/' active={ this.state.homeActive } onClick={ this.homeClicked }>Home</Menu.Item>
          <Menu.Item as={ Link } to='/search' active={ this.state.searchActive } onClick={ this.searchClicked }>Search</Menu.Item>
          <Menu.Item as={ Link } to='/add' active={ this.state.addActive } onClick={ this.addClicked }>Add</Menu.Item>
          <Menu.Item as={ Link } to='/update' active={ this.state.updateActive } onClick={ this.updateClicked }>Update</Menu.Item>
          <Menu.Item as={ Link } to='/export' active={ this.state.exportActive } onClick={ this.exportClicked }>Export</Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item className='item'>
              <Button as='a'>Log in</Button>
            </Menu.Item>
            <Menu.Item>
              <Button as='a' primary>Sign Up</Button>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </Menu>
    );
  }
}
