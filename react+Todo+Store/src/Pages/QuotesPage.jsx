// src/pages/QuotesPage.jsx
import { Container, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

function QuotesPage() {
  const todos = useSelector((state) => state.todos.items);
  const completedCount = todos.filter(todo => todo.complete).length;
  const quote = "Success is not final, failure is not fatal: It is the courage to continue that counts.";

  return (
    <div className="Quotes-container">
      <Container className="Quotes-content">
        <h1>Quote & Stats</h1>
  
        <Card className="Quotes-card">
          <Card.Body>
            <Card.Title>📌 Motivational Quote</Card.Title>
            <Card.Text className="fst-italic">
              “{quote}”
            </Card.Text>
          </Card.Body>
        </Card>
  
        <Card className="Quotes-card">
          <Card.Body>
            <Card.Title>📊 To-Do Stats</Card.Title>
            <Card.Text>
              Completed Tasks: <strong>{completedCount}</strong>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
  
}

export default QuotesPage;
