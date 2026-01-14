import React, { useEffect, useRef, useState } from 'react';
import styles from '../styles.module.css';
import { ActionButton } from '../../components/ActionButton/ActionButton';
import { useLoginMutation } from '../../app/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../app/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import useTitle from '../../hooks/useTitle';
import Loader from '../../components/Loader';

const LoginPage: React.FC = () => {
  const userRef = useRef<HTMLInputElement>(null);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('test');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [username, password]);

  useTitle('Todo | Login');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setUsername('');
      setPassword('');
      navigate('/');
    } catch (err: any) {
      // check type of this
      if (!err.status) setErrMsg('No Server Response');
      else if (err.status === 400) setErrMsg('Missing Username or Password');
      else if (err.status === 401) setErrMsg('Incorrect Username or Password');
      else setErrMsg('Error - ' + err.data?.message);
    }
  };

  // to get text color from index.css and add to the loader

  let content;
  if (isLoading) content = <Loader />;
  else {
    content = (
      <>
        <form onSubmit={handleFormSubmit}>
          <div className={styles.taskForm}>
            <div>
              <input
                type='text'
                id='username'
                value={username}
                ref={userRef}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder='Username'
              />
              <label htmlFor='username' style={{ display: 'none' }}>
                Username
              </label>
            </div>
            <br />
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder='Password'
            />
          </div>
          <br />
          {errMsg !== '' && (
            <>
              <p className={styles.errorMessage}>{errMsg}</p> <br />
            </>
          )}

          <p>
            New user?{' '}
            <span className={styles.link} onClick={() => navigate('/register')}>
              Register here
            </span>
          </p>
          <br />
          <div>
            <ActionButton varient='primary' type='submit'>
              Login
            </ActionButton>
          </div>
        </form>
      </>
    );
  }

  return (
    <main className={`${styles.UserFormContainer} ${styles.container} `}>
      <div className={`${styles.slide} ${styles.todoForm}`}>
        <h1 className={styles.title}>Login</h1>
        {content}
      </div>
    </main>
  );
};

export default LoginPage;
