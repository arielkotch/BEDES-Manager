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

const FixedMenu = () => (
  <Menu inverted>
    <Container>
      <Menu.Item as='a' header>
        Bedes Manager
      </Menu.Item>
      <Menu.Item as={ Link } to='/' active>Home</Menu.Item>
      <Menu.Item as={ Link } to='/search'>Search</Menu.Item>
      <Menu.Item as={ Link } to='/add'>Add</Menu.Item>
      <Menu.Item as={ Link } to='/update'>Update</Menu.Item>
      <Menu.Item as={ Link } to='/export'>Export</Menu.Item>
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

export default FixedMenu;
