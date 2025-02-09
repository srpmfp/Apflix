import PropTypes from 'prop-types';
import { Card, Col } from 'react-bootstrap';
import './movie-card.scss';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie, user, token, setUser }) => {
  const [isInUserList, setIsInUserList] = useState(false);

  useEffect(() => {
    if (user && user.movieId) {
      const isMovieInList = user.movieId.includes(movie.id);
      setIsInUserList(!!isMovieInList);
    }
  }, [movie, user]);

  const postMovie = () => {
    const updateMovie = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${token}`,
      },
      body: JSON.stringify({
        movieId: movie.id,
      }),
    };
    fetch(`https://appflixcf-d4726ef19667.herokuapp.com/users/${user.Username}`, updateMovie, {
      Headers: { Authorization: `bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          alert('Movie added to your list');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((e) => {
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
        movieId: movie.id,
      }),
    };
    fetch(
      `https://appflixcf-d4726ef19667.herokuapp.com/users/${encodeURIComponent(
        user.Username
      )}/movies/${encodeURIComponent(movie.id)}`,
      removeMovie
    )
      .then((response) => {
        if (response.ok) {
          alert('Movie removed from your list');
        }
        if (!response.ok) {
          throw new Error('Response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((e) => {
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
          Remove from favorites
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
          Favorite
        </Button>
      );
    }
  };
  return (
    <Col
      fluid='md'
      md={3}
      sm={6}
      xs={12}
      className='movieCardCont m-cont bg-gradient position-relative m-3 p-2 '>
      {addOrRemove()}
      <Link
        to={`/movie/${encodeURIComponent(movie.id)}`}
        className='movieLink'>
        <Card
          className='movieCardCont m-2 p-0'
          variant='link'
          onClick={() => {}}>
          <Card.Img
            src={movie.image}
            variant='top'
            className='movieCardImg'
          />
          <Card.Body className='p-0 movieCardBody text-center text-white text-outline'>
            <Card.Title className='mTitleText text-light'>{movie.title}</Card.Title>
            <Card.Text className='mGenreText'>{movie.genre}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </Col>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
