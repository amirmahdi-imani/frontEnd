// src/pages/SignUpPage.jsx
import { Container } from 'react-bootstrap';
import SignUpForm from '../features/signUp/SignUpForm';

function SignUpPage() {
  return (
    <div className="Login-page slideFadeIn">
      <Container className="Login-content card-style p-4">
        <SignUpForm />
      </Container>
    </div>
  );
}

export default SignUpPage;
