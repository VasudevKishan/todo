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
  const [registerUser, { isLoading, isError, error }] =
    useRegisterUserMutation();
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<RegisterUserBodyType>({
    mode: 'onBlur',
    reValidateMode: 'onBlur',
  });
  const navigate = useNavigate();

  const handleFormSubmit = async (data: RegisterUserBodyType) => {
    try {
      // const payload =
      await registerUser(data).unwrap();
      // console.log(payload);
      navigate('/new-project');
    } catch (err) {
      const errorObj = err as { data: { message: string } };
      console.error(errorObj.data.message);
    }
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
                {...register('username', {
                  required: 'Username is Required',
                  minLength: {
                    value: 4,
                    message: 'Minimum 4 characters required',
                  },
                  maxLength: {
                    value: 15,
                    message: 'Maximum 15 characters allowed',
                  },
                  onChange: () => {
                    if (errors.username) {
                      clearErrors('username');
                    }
                  },
                })}
                title='Enter your username'
                maxLength={15}
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
                  message: 'Invalid email format',
                },
                maxLength: {
                  value: 50,
                  message: 'Maximum 50 characters allowed',
                },
                onChange: () => {
                  if (errors.email) {
                    clearErrors('email');
                  }
                },
              })}
              title='Enter your email'
              maxLength={50}
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
              {...register('password', {
                required: 'Password is Required',
                minLength: {
                  value: 8,
                  message: 'Minimum 8 characters required',
                },
                maxLength: {
                  value: 25,
                  message: 'Maximum 25 characters allowed',
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,25}$/,
                  message: `Password must contain - \n
                  8-25 characters long,
                  an uppercase letter,
                  a lowercase letter,
                  a number,
                  and a special character`,
                },
                onChange: () => {
                  if (errors.password) {
                    clearErrors('password');
                  }
                },
              })}
              title='Enter your password'
              maxLength={25}
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
            {isError && (
              <div className={styles.errorBox}>
                {(error as { data: { message: string } }).data.message}
              </div>
            )}
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
