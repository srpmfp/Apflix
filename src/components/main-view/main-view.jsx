import { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { NavigationBar } from '../nav-bar/nav-bar';
import { ProfileView } from '../profile-view/profile-view';
import { Card, Col, Row, Button } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import './main-view.scss';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  // User Information
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  //Movie information
  const [movies, setMovies] = useState([]);
  const [mSearch, setMSearch] = useState('');
  const [genre, setGenre] = useState('');
  const [buttonToggle, setButtonToggle] = useState(false);

  // return movie info from the database GET REQ
  useEffect(() => {
    fetch('https://appflixcf-d4726ef19667.herokuapp.com/movies', {
      headers: { Authorization: `bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const movieData = data.map((movie) => {
          return {
            id: movie._id,
            title: movie.title,
            genre: movie.genre,
            director: {
              name: movie.director.name,
              bio: movie.director.bio,
              birthday: movie.director.birthday,
            },
            image: movie.image,
          };
        });
        setMovies(movieData);
      });
  }, [token]);

  const filteredMovies = movies.filter((movie) => {
    if (genre === '') {
      return movie.title.toLowerCase().includes(mSearch.toLowerCase());
    }
    if (genre !== '') {
      return movie.genre === genre && movie.title.toLowerCase().includes(mSearch.toLowerCase());
    }
  });
  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      />
      <Row className='main-view w-100 justify-content-center align '>
        <Routes>
          <Route
            path='/login'
            element={
              <>
                {user ? (
                  <Navigate to='/' />
                ) : (
                  <Col className='d-flex w-100 flex-column align-items-center justify-content-center'>
                    <Card className='bg-dark w-50'>
                      <LoginView
                        onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                        }}
                      />
                    </Card>
                  </Col>
                )}
              </>
            }
          />
          <Route
            path='/movie/:movieId'
            element={
              <>
                {!user ? (
                  <Navigate
                    to='/login'
                    replace
                  />
                ) : movies.length === 0 ? (
                  <div className='main-view'>The list is empty!</div>
                ) : (
                  <Col
                    md={5}
                    className=' mb-5 '>
                    <MovieView
                      movie={movies}
                      token={token}
                      user={user}
                      setUser={setUser}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path='/'
            element={
              <>
                {!user ? (
                  <Navigate
                    to='/login'
                    replace
                  />
                ) : movies.length === 0 ? (
                  <div className='main-view'>The list is empty!</div>
                ) : (
                  <Row className='d-flex w-100 flex-column align-items-center justify-content-center'>
                    <div className='col-6 text-light '>Search Movie</div>
                    <input
                      className='search-bar'
                      label='MovieSearch'
                      type='text'
                      onChange={(e) => {
                        if (mSearch !== '') {
                          setMSearch(e.target.value);
                        } else {
                          setMSearch('  ');
                        }
                      }}></input>
                    <Row className='d-flex w-100 flex-row flex-basis align-items-center justify-content-center'>
                      <Button
                        className='col-sm-2 m-1 btn-secondary'
                        onClick={() => {
                          if (buttonToggle) {
                            setGenre('Anime');
                            setButtonToggle(!buttonToggle);
                          }
                          if (!buttonToggle) {
                            setGenre('');
                            setButtonToggle(!buttonToggle);
                          }
                        }}>
                        Anime
                      </Button>
                      <Button
                        className='col-sm-2 m-1 btn-secondary'
                        onClick={() => {
                          if (buttonToggle) {
                            setGenre('Comedy');
                            setButtonToggle(!buttonToggle);
                          }
                          if (!buttonToggle) {
                            setGenre('');
                            setButtonToggle(!buttonToggle);
                          }
                        }}>
                        Comedy
                      </Button>
                      <Button
                        className='col-sm-2 m-1 btn-secondary'
                        onClick={() => {
                          if (buttonToggle) {
                            setGenre('Drama');
                            setButtonToggle(!buttonToggle);
                          }
                          if (!buttonToggle) {
                            setGenre('');
                            setButtonToggle(!buttonToggle);
                          }
                        }}>
                        Drama
                      </Button>
                      <Button
                        className='col-sm-2 m-1 btn-secondary'
                        onClick={() => {
                          if (buttonToggle) {
                            setGenre('Period');
                            setButtonToggle(!buttonToggle);
                          }
                          if (!buttonToggle) {
                            setGenre('');
                            setButtonToggle(!buttonToggle);
                          }
                        }}>
                        Period
                      </Button>
                    </Row>
                    <Col
                      className='h-100 w-50 d-flex flex-row flex-{grow|shrink}-1 flex-wrap overflow-auto 
          align-self-center justify-content-center'>
                      {filteredMovies.map((movie) => (
                        <MovieCard
                          movie={movie}
                          key={movie.id}
                          user={user}
                          token={token}
                        />
                      ))}
                    </Col>
                  </Row>
                )}
              </>
            }
          />
          <Route
            path='/users/:username'
            element={
              <>
                {!user ? (
                  <Navigate
                    to='/login'
                    replace
                  />
                ) : (
                  <Col className='d-flex w-100 flex-column align-items-center justify-content-center'>
                    <Card className='bg-dark w-50'>
                      <ProfileView
                        user={user}
                        movie={movies}
                        token={token}
                        onLoggedOut={() => {
                          setUser(null);
                          setToken(null);
                          localStorage.clear();
                        }}
                        setUser={setUser}
                      />
                      )
                    </Card>
                  </Col>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
