import { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Card, Row, Button, Col } from 'react-bootstrap';
import { Stack } from 'react-bootstrap';
import moment from 'moment-timezone';
import './signup-view.scss';

export const SignupView = ({ returnBtn }) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      Username: username,
      Password: password,
      email: email,
      birthday: birthday,
    };
    fetch('https://appflixcf-d4726ef19667.herokuapp.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (response.ok) {
        alert('signup successful');
        window.location.reload();
      } else {
        alert('signup failed');
      }
    });
  };
  return (
    <Row className='align-items-center w-100 '>
      <Card className=' bg-dark radius-10 m-0 p-0'>
        <Col className=' d-flex flex-column w-100 m-auto col-6 bg-dark'>
          <Form
            onSubmit={handleSubmit}
            className='signupForm text-light p-1'>
            <Form.Group controlId='formBasicUsername'>
              <Form.Label> username :</Form.Label>
              <Form.Control
                type='text'
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
                minLength='3'
              />
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              <Form.Label>password :</Form.Label>
              <Form.Control
                type='text'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength='3'
              />
            </Form.Group>

            <Form.Group controlId='formBirthday'>
              <Form.Label>birthday :</Form.Label>
              <Form.Control
                type='date'
                value={birthday}
                onChange={(e) => {
                  const timeZone = moment.tz.guess();
                  const formatDate = moment(e.target.value).tz(timeZone).format('YYYY-MM-DD');
                  setBirthday(formatDate);
                }}
                required
                minLength='3'
              />
            </Form.Group>
            <Form.Group controlId='formEmail'>
              <Form.Label>email :</Form.Label>
              <Form.Control
                type='text'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                minLength='3'
              />
            </Form.Group>
            <Stack
              gap={2}
              className='d-flex justify-content-center'>
              <button
                type='submit'
                className='btn btn-secondary'>
                Submit
              </button>
            </Stack>
          </Form>
        </Col>
        <Button
          variant='dark'
          size='sm'
          onClick={() => {
            returnBtn(false);
          }}
          className='btn btn-success'>
          Return
        </Button>
      </Card>
    </Row>
  );
};

PropTypes.SignupView = {
  returnBtn: PropTypes.func.isRequired,
};
