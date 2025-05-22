import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo } from './todosSlice';
import { Form, Button, Row, Col } from 'react-bootstrap';

function AddTodo() {
  const [text, setText] = useState('');
  const dispatch = useDispatch();
  const userId = useSelector(state => state.auth.user.id)

  const handleAdd = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo({ text, userId }));  
      setText('');
    }
  };

  return (
    <>
      <Row>
        <Col className="form-column">
          <Form onSubmit={handleAdd}>
            <Form.Group className="mb-3">
              <Form.Label className="todo-label">ToDo</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your Todo"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="todo-input"
              />
            </Form.Group>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button
            variant="primary"
            type="button"
            onClick={handleAdd}
            className="submit-button"
          >
            Submit
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default AddTodo;
