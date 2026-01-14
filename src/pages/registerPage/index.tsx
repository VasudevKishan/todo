import React from 'react';
import styles from '../styles.module.css';
import { useRegisterUserMutation } from '../../app/users/usersApiSlice';
import { useForm } from 'react-hook-form';
import { ActionButton } from '../../components/ActionButton/ActionButton';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import Loader from '../../components/Loader';

interface RegisterUserBodyType {
  username: string;
  email: string;
  password: string;
}

const RegisterPage: React.FC = () => {
  const [registerUser, { isLoading, isError }] = useRegisterUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterUserBodyType>({ mode: 'onChange' });
  const navigate = useNavigate();

  const handleFormSubmit = async (data: RegisterUserBodyType) => {
    await registerUser(data).unwrap();
    if (!isError) navigate('/new-project');
  };

  useTitle('Todo | Register');

  let content;
  if (isLoading) content = <Loader />;
  else
    content = (
      <>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className={styles.taskForm}>
            <div>
              <input
                type='text'
                id='username'
                placeholder='Username'
                {...register('username', { required: 'Username is Required' })}
                title='Enter your username'
              />
              <label htmlFor='username' style={{ display: 'none' }}>
                Username
              </label>
            </div>
            {typeof errors.username?.message === 'string' && (
              <>
                <p className={styles.errorMessage}>{errors.username.message}</p>
              </>
            )}
            <br />
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='Email'
              {...register('email', {
                required: 'Email is Required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Invalid Email format',
                },
              })}
              title='Enter your email'
            />
            {typeof errors.email?.message === 'string' && (
              <>
                <p className={styles.errorMessage}>{errors.email.message}</p>
              </>
            )}

            <br />
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              placeholder='Password'
              {...register('password', { required: 'Password is Required' })}
              title='Enter your password'
            />
            {typeof errors.password?.message === 'string' && (
              <>
                <p className={styles.errorMessage}>{errors.password.message}</p>
              </>
            )}
            <br />
            <p>
              Already Registered?{' '}
              <span className={styles.link} onClick={() => navigate('/login')}>
                Login here
              </span>
            </p>
            <br />
            <div>
              <ActionButton varient='primary' type='submit'>
                Register
              </ActionButton>
            </div>
          </div>
        </form>
      </>
    );

  return (
    <main className={`${styles.UserFormContainer} ${styles.container} `}>
      <div className={`${styles.slide} ${styles.todoForm}`}>
        <h1 className={styles.title}>Welcome</h1>
        {content}
      </div>
    </main>
  );
};

export default RegisterPage;
