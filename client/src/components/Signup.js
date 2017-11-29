import React, { Component } from 'react';
import  { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Button, Form, Grid, Header, Message, Segment, Checkbox } from 'semantic-ui-react'

export default class AddTerm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupParams: {
        email: '',
        password: '',
        passwordRepeat: '',
        usertype: 'normal'
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
      signupParams: {
        ...this.state.signupParams,
        [event.target.name]: event.target.value
      }
    });
  };

  handleFormSubmit = event => {
    // Save this in variable, self
    const self = this;
    const params = this.state.signupParams;

    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios.post('/api/user/signup', params, config)
      .then(function(res) {
        self.setState({
          authenticated: res.data.authenticated
        })

      })
      .catch(function(error) {
        console.log(error);
      });
    // Prevent form default behavior
    event.preventDefault();
  }

  handleUserTypeRadioButtonChange = (e, { value }) => {
    this.setState({
      signupParams: {
        ...this.state.signupParams,
        usertype: value
      }
    });
  }

  render() {
    const { authenticated } = this.state;
    if (authenticated) {
      return <Redirect to='/' />
    }

    return (
      <div className='signup-form'>
        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as='h2' textAlign='center'>
              Register for an account
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
                <Form.Input
                  fluid
                  icon='lock'
                  iconPosition='left'
                  placeholder='Repeat Password'
                  type='password'
                  value={ this.state.passwordRepeat }
                  onChange={ this.handleInputChange }
                  name='passwordRepeat'
                />
                <Form.Field>
                  User Level:
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    radio
                    label='Normal'
                    name='userTypeRadioGroup'
                    value='normal'
                    checked={this.state.signupParams.usertype === 'normal'}
                    onChange={this.handleUserTypeRadioButtonChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Checkbox
                    radio
                    label='Admin'
                    name='userTypeRadioGroup'
                    value='admin'
                    checked={this.state.signupParams.usertype === 'admin'}
                    onChange={this.handleUserTypeRadioButtonChange}
                  />
                </Form.Field>
                <Button color='blue' fluid size='large'>Sign Up</Button>
              </Segment>
            </Form>
            <Message>
              Already have an account? <a href='/login'>Login</a>
            </Message>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
