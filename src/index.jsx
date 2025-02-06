import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { MainView } from './components/main-view/main-view.jsx';
import { Container } from 'react-bootstrap';
import './index.scss';

const MyFlixApp = () => {
  return (
    <Container className='indexCont d-flex flex-column mx-0 mw-100 mh-100 overflow-scroll'>
      <MainView />;
    </Container>
  );
};

const container = document.querySelector('#root');
const root = createRoot(container);

root.render(<MyFlixApp />);
