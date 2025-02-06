import PropTypes from 'prop-types';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, Button, ListGroup } from 'react-bootstrap';
import './movie-view.scss';

export const MovieView = ({ movie, user, token, setUser }) => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [isInUserList, setIsInUserList] = useState(false);
  const m = movie.find((m) => m.id === movieId);
  console.log(m);

  useEffect(() => {
    if (m) {
      const u = user.movieId.filter((userMovie) => userMovie.id !== m.id).includes(m.id);
      setIsInUserList(!!u);
      console.log(u);
    }
  }, [movie, user, movieId]);

  const postMovie = () => {
    const updateMovie = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({
        movieId: m.id,
      }),
    };
    fetch(`https://appflixcf-d4726ef19667.herokuapp.com/users/${user.Username}`, updateMovie, {
      Headers: { Authorization: `bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert('Movie added to your list');
        setUser(data);
        navigate(-1);
      })
      .catch((e) => {
        console.log(e);
        alert(`Error updating user info: ${e.message}`);
      });
  };

  const delMovie = () => {
    const removeMovie = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({
        movieId: m.id,
      }),
    };
    fetch(
      `https://appflixcf-d4726ef19667.herokuapp.com/users/${encodeURIComponent(
        user.Username
      )}/movies/${encodeURIComponent(movieId)}`,
      removeMovie
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        alert('Movie has been removed from your list');
        console.log(data);
        setUser(data);
        navigate(-1);
      })
      .catch((e) => {
        console.log(e);
        alert(`Error in updating : ${e.message}`);
      });
  };

  const addOrRemove = () => {
    if (isInUserList) {
      return (
        <Button
          className='float-right w-100 btn-secondary'
          onClick={() => {
            delMovie();
            setIsInUserList(false);
          }}>
          Remove
        </Button>
      );
    } else {
      return (
        <Button
          className='float-right w-100 btn-secondary'
          onClick={() => {
            postMovie();
            setIsInUserList(true);
          }}>
          Add
        </Button>
      );
    }
  };

  {
    return (
      <Card className='movieViewCard  justify-self-center w-50 justify-content-center align-self-center p-1'>
        {addOrRemove()}
        <Card.Body
          md={3}
          sm={6}>
          <Card.Img
            md={3}
            sm={6}
            xs={12}
            src={m.image}
            style={{ width: '50%' }}
            alt='Movie Title Image'
          />
          <Card.Title className='text-light'> Title: {movie.title}</Card.Title>
          <ListGroup className='movieViewList'>
            <ListGroup.Item> Genre: {m.genre}</ListGroup.Item>
            <ListGroup.Item> Director: {m.director.name}</ListGroup.Item>
            <ListGroup.Item>Bio: {m.director.bio}</ListGroup.Item>
            <ListGroup.Item>
              Birthday: {new Date(m.director.birthday).toLocaleDateString()}
            </ListGroup.Item>
          </ListGroup>
          <Link to={''}>
            <Button
              onClick={(e) => {
                e.preventDefault();
                navigate(-1);
              }}
              className='p-1 m-2 '>
              Back
            </Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
};
MovieView.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string,
    director: PropTypes.shape({
      name: PropTypes.string,
      bio: PropTypes.string,
      birthday: PropTypes.string,
    }),
    image: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  user: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string,
    movieId: PropTypes.array,
  }).isRequired,
  token: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
};
