import PropTypes from 'prop-types';
import { Card, Col } from 'react-bootstrap';
import './movie-card.scss';
import { Link } from 'react-router-dom';

export const MovieCard = ({ movie, user }) => {
  return (
    <Col
      fluid='md'
      md={3}
      sm={6}
      xs={12}
      className='m-cont bg-gradient position-relative m-3 p-2 '>
      <Link
        to={`/movie/${encodeURIComponent(movie.id)}`}
        className='movieLink'>
        <Card
          className='movieCardCont m-0 p-0'
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
