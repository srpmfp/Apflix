import './profile-view.scss';
import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { Modal, Col } from 'react-bootstrap';
import moment from 'moment-timezone';

import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const ProfileView = ({ user, movie, token, setUser, onLoggedOut }) => {
  const userMovie = movie.filter((m) => user.movieId.includes(m.id));

  const [inputUserName, setUserName] = useState(user.Username);
  const [inputBirthday, setBirthday] = useState(user.birthday);
  const [inputEmail, setEmail] = useState(user.email);
  const [inputPassword, setPassword] = useState('');
  //Modal Control States

  const [show, setShow] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // format date to MM-DD-YYYY
  const timeZ = moment.tz.guess();
  const formatDate = moment(inputBirthday).tz(timeZ).format('MM-DD-YYYY');

  // put request to update user info
  const updateInfo = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
    body: JSON.stringify({
      Username: inputUserName,
      email: inputEmail,
      birthday: inputBirthday,
      Password: inputPassword,
    }),
  };

  const putInfo = () => {
    fetch(`https://appflixcf-d4726ef19667.herokuapp.com/users/${user.Username}`, updateInfo, {
      Headers: { Authorization: `bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        handleClose();
      })
      .catch((e) => {
        alert(`Error updating user info: ${e.message}`);
      });
  };
  // delete user account
  const deleteUser = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
  };
  const deleteCall = () => {
    fetch(`https://appflixcf-d4726ef19667.herokuapp.com/users/${user.Username}`, deleteUser, {
      Headers: { Authorization: `bearer ${token}` },
    })
      .then(() => alert('Account Deleted'))
      .catch((e) => {
        alert(`Error deleting user info: ${e.message}`);
      });
  };
  return (
    <Col className='bg-dark'>
      <Card>
        <Button
          className='btn btn-sm btn-secondary'
          onClick={handleShow}>
          Update info
        </Button>
        <Card.Body>
          <Card.Title>Username: {user.Username}</Card.Title>
          <Card.Text>Email: {user.email}</Card.Text>
          <Card.Text>
            Birthday:
            {formatDate}
          </Card.Text>
          <Col
            className='h-100 w-100 d-flex flex-row flex-{grow|shrink}-1 flex-wrap overflow-auto 
          align-self-center justify-content-center'>
            {userMovie.map((movie) => (
              <MovieCard
                movie={movie}
                key={movie.id}
                user={user}
                token={token}
                setUser={setUser}
              />
            ))}
          </Col>
        </Card.Body>
      </Card>
      <Modal
        className='modal-dialog-centered '
        show={show}
        onHide={handleClose}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Update Info</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              <label className='p-1'>Username:</label>
              <input
                label='Username'
                type='text'
                value={inputUserName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </p>
            <p>
              <label className='p-1'>Birthday:</label>
              <input
                type='date'
                value={formatDate}
                onChange={(e) => {
                  const timeZone = moment.tz.guess();
                  const formatDate = moment(e.target.value).tz(timeZone).format('YYYY-MM-DD');
                  setBirthday(formatDate);
                }}
              />
            </p>
            <p>
              <label className='p-1'>Email:</label>
              <input
                type='text'
                value={inputEmail}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </p>
            <p>
              <label className='p-1'>Password: </label>
              <input
                type='text'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant='primary'
              onClick={() => putInfo()}>
              Save changes
            </Button>
            <Button
              variant='secondary'
              onClick={() => {
                setShow(false);
                setUserName(user.Username);
                setBirthday(user.birthday);
                setEmail(user.email);
              }}>
              Close
            </Button>
            <Button
              variant='danger'
              onClick={() => {
                deleteCall();
                onLoggedOut();
              }}>
              Delete Account
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </Col>
  );
};
PropTypes.propTypes = {
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string.isRequired,
    movieId: PropTypes.array.isRequired,
  }).isRequired,
  movie: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
  onLoggedOut: PropTypes.func.isRequired,
};
