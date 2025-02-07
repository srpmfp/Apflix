import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Form, Card, Button, Col, Row, Col } from 'react-bootstrap';
import { SignupView } from '../signup-view/signup-view';

import './login-view.scss';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [signUp, setSignup] = useState();

  const handleEvent = (e) => {
    e.preventDefault();
    console.log(e.target);
    const data = {
      Username: username,
      Password: password,
    };

    fetch('https://appflixcf-d4726ef19667.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response: ', data);
        if (data.user) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          onLoggedIn(data.user, data.token);
        } else {
          alert('Incorrect username or password');
        }
      })

      .catch((e) => {
        alert('Error logging in');
      });
  };
  return (
    <Row
      md={1}
      className='align-items-center justify-content-center bg-dark rounded'>
      {!signUp ? (
        <Card className='bg-dark p-0'>
          <Col className=' d-flex flex-column w-100 m-auto col-6 bg-dark'>
            <label className='login-Label  radius-10 w-100 text-center'>Login Here</label>
            <Card className='login-card d-flex  bg-dark radius-10 '>
              <Form
                onSubmit={handleEvent}
                className='login-card radius-10 text-dark'>
                <Form.Group
                  controlId='formBasicUsername'
                  className='p-1'>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type='text'
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group
                  controlId='formBasicPassword'
                  className='p-1'>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type='submit justify-self-center '
                    size='sm'>
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            </Card>
          </Col>
          <Col className='col-3 w-100 d-flex signup-btn-container'>
            <Button
              className='btn btn-secondary'
              onClick={(viewSignUp) => {
                setSignup(viewSignUp);
              }}>
              Sign Up
            </Button>
          </Col>
        </Card>
      ) : (
        <Col className='d-flex justify-content-center m-0 p-0'>
          <SignupView
            returnBtn={() => {
              setSignup(null);
            }}
          />
        </Col>
      )}
    </Row>
  );
};
LoginView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onLoggedIn: PropTypes.func.isRequired,
  Button: PropTypes.func.isRequired,
};
