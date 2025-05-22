// src/pages/TodoPage.jsx
import AddTodo from '../features/todos/AddTodo';
import TodoList from '../features/todos/TodoList';
import { Container } from 'react-bootstrap';

function TodoPage() {
  return (
    <div className="page-container">
      <Container>
        <AddTodo />
        <TodoList />
      </Container>
    </div>
  );
}

export default TodoPage;
