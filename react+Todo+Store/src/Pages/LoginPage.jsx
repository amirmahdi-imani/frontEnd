// src/pages/LoginPage.jsx
import { Container, Form, Button } from 'react-bootstrap';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authSlice';
import { useForm } from 'react-hook-form';


function LoginPage() {
  const {
    register,
    handleSubmit,
    formState:{errors}
  }  = useForm();

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const {user} = useSelector((state)=> state.auth)

  useEffect(()=>{
    if(user){
      navigate('/')  
    }
  },[user,navigate])

  const handleLogin = (data) => {

    dispatch(loginUser(data));
  };

  return (
    <div className="Login-page slideFadeIn">
      <Container className="Login-content card-style p-4">
        <h1 className="Login-title mb-4 text-center">Login</h1>
        <Form onSubmit={handleSubmit(handleLogin)}>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              {...register('email',{
                required:'وارد کردن ایمیل الزامیست!!!!'
              })}
            />
            {errors.email && (
              <span className='text-danger'>{errors.email.message}</span>
            )}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register('password',{
                required:'وارد کردن رمز عبور الزامیس!!!'
              })}
            />
            {errors.password && (
              <span className="text-danger">{errors.password.message}</span>
            )}
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100" disabled={isLoading}>
            {isLoading ? 'در حال ورود...' : 'Login'}
          </Button>
        </Form>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <div className="mt-3">
          <span>if u have not any account, </span>
          <Link to="/signup">Sign up</Link>
        </div>
      </Container>
    </div>
  );
}

export default LoginPage;
