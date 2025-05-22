import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Menu() {
  const navigate = useNavigate();

  return (
    <div className="menu-container">
      <Container className="menu-content text-center">
        <h1 className="menu-title">Welcome to the App</h1>
        <div className="menu-buttons">
          <Button className="menu-btn" onClick={()=> navigate('/fakestore')}>
            Store
          </Button>
          <Button className="menu-btn" onClick={() => navigate('/todo')}>
            To-Do List
          </Button>
          <Button className="menu-btn" onClick={() => navigate('/quotes')}>
            Quotes & Stats
          </Button>
        </div>
      </Container>
    </div>
  );
}

export default Menu;
