import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginParams: {
        email: '',
        password: '',
      },
      authenticated: false
    };
  }

  componentDidMount() {
    const self = this;
    // check if user is logged in
    axios.get('/api/user/verify')
      .then(function(res) {
        self.setState({
          authenticated: res.data.authenticated
        })

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  handleInputChange = event => {

    this.setState({
      loginParams: {
        ...this.state.loginParams,
        [event.target.name]: event.target.value
      }
    });
  };

  handleFormSubmit = event => {
    // Save this in variable, self
    const self = this;
    const params = this.state.loginParams;

    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios.post('/api/user/login', params, config)
      .then(function(res) {
        console.log(res.data);
        self.setState({
          authenticated: res.data.authenticated
        });

      })
      .catch(function(error) {
        console.log(error);
      });
    // Prevent form default behavior
    event.preventDefault();
  }

  render() {
    const { authenticated } = this.state;
    if (authenticated) {
      return <Redirect to='/' />
    }

    return (
      <div className='login-form'>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' textAlign='center'>
              Log in to your account
            </Header>
            <Form size='large' onSubmit={ this.handleFormSubmit }>
              <Segment stacked>
                <Form.Input
                  fluid
                  icon='user'
                  iconPosition='left'
                  placeholder='E-mail address'
                  value={ this.state.email }
                  onChange={ this.handleInputChange }
                  name='email'
                />
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Password'
                  type='password'
                  value={ this.state.password }
                  onChange={ this.handleInputChange }
                  name='password'
                />
                <Button color='blue' fluid size='large'>Login</Button>
              </Segment>
            </Form>
            <Message>
              New to us? <a href='/signup'>Sign Up</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
