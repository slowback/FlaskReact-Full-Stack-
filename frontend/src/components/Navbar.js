import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import image from '../cup.png';

function Collapsible(props) {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">
          <img alt="" src={image} width="30" height="30" /> My Coffee Shop
        </Navbar.Brand>
        <Nav>
          <Nav.Link onClick={() => props.openForm()}>
            <Button variant="outline-success">Insert</Button>
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Collapsible;
