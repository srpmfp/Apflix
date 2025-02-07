import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './nav-bar.scss';

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar
      className='nBar'
      expand='lg'>
      <Container>
        <Navbar.Brand
          as={Link}
          to='/'>
          Apflix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav me='auto'>
            {user && (
              <Nav.Link
                as={Link}
                to={`/users/${encodeURIComponent(user.Username)}`}>
                Profile
              </Nav.Link>
            )}
          </Nav>
          <Nav me='auto'>{user && <Nav.Link onClick={onLoggedOut}>Log Out</Nav.Link>}</Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
