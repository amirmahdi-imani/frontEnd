// src/features/todos/TodoList.jsx
import { useSelector, useDispatch } from 'react-redux';
import { fetchTodos, removeTodo, toggleComplete } from './todosSlice';
import { ListGroup, Button, Row, Col, Spinner } from 'react-bootstrap';
import { useEffect } from 'react';

function TodoList() {
  const dispatch = useDispatch();
  const { items: todos, loading } = useSelector((state) => state.todos);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchTodos(user.id));
    }
  }, [dispatch, user?.id]);

  if (loading) {
    return (
      <div className="text-center my-4">
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <div className="todo-page">
      <Row>
        <Col>
          <ListGroup className="todo-list">
            {todos.map((item) => (
              <ListGroup.Item
                key={item.id}
                action
                variant={item.complete ? 'success' : 'light'}
                className="todo-item d-flex justify-content-between align-items-center"
              >
                {item.text}
                <div>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => dispatch(removeTodo(item.id))}
                    className="remove-button mx-1"
                  >
                    X
                  </Button>
                  <Button
                    variant={item.complete ? 'warning' : 'success'}
                    size="sm"
                    onClick={() =>
                      dispatch(toggleComplete({ id: item.id, current: item.complete }))
                    }
                    className="done-button"
                  >
                    {item.complete ? 'Undone' : 'Done'}
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

export default TodoList;
