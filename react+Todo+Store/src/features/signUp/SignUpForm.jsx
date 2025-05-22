import { Form, Button, Container } from 'react-bootstrap';
import { supabase } from '../../authApi.js';
import { useDispatch } from 'react-redux';
import { signUpFailure, signUpStart, signUpSuccess } from './signUpSlice.js';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

function SignUpForm() {
  const {register,
    handleSubmit,
    formState:{errors,isSubmitting}
  } = useForm()

  const dispatch = useDispatch();

  const handleSignUp = async ({email,password}) => {
    dispatch(signUpStart());

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      dispatch(signUpFailure(error.message));
      toast.error(error.message);
    } else {
      dispatch(signUpSuccess(data.user));
      toast.success('ثبت‌نام موفق! لطفاً ایمیلت را چک کن.');
    }
  };

  return (
    <div className="Login-page slideFadeIn">
      <Container className="Login-content card-style p-4">
        <h1 className="Login-title mb-4 text-center">ثبت‌نام</h1>

        <Form onSubmit={handleSubmit(handleSignUp)}>
          <Form.Group className="mb-3">
            <Form.Label>ایمیل</Form.Label>
            <Form.Control
              type="email"
              placeholder="ایمیل خود را وارد کنید"
              {...register('email',{
                required:'ایمیل الزامی هستش عزیزم!!!',
                pattern:{
                  value:/^\S+@\S+$/i,
                  message:'ایمیل معتفبر نیست!!!'
                }
              })}
            />
            {errors.email && (
              <div className="text-danger">{errors.email.message}</div>
            )}
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>رمز عبور</Form.Label>
            <Form.Control
              type="password"
              placeholder="رمز عبور"
              {...register('password',{
                required:'رمز عبور نیازههههه',
                minLength:6,
                message:'رمز عبور باید حداقل 6 کارکتر باشد.'
              })}
            />
            {errors.password && (
              <div className="text-danger">{errors.password.message}</div>
            )}
          </Form.Group>

          <Button variant="success"
           type="submit"
            className="w-100"
            disabled={isSubmitting}>
            {isSubmitting ? 'در حال ثبت‌نام...' : 'ثبت‌نام'}
          </Button>
        </Form>

        <div className="mt-3 text-center">
          <span>قبلاً حساب ساختی؟ </span>
          <Link to="/login">ورود</Link>
        </div>
      </Container>
    </div>
  );
}

export default SignUpForm;
