import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../../app/auth/authSlice';
import { useEffect, useRef, useState } from 'react';
import { useRefreshMutation } from '../../app/auth/authApiSlice';
import Loader from '../../components/Loader';
import { Navigate, Outlet } from 'react-router-dom';

const env = import.meta.env.VITE_ENV;

const PersistLogin = () => {
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef<boolean>(false);

  const [isTrueSuccess, setIsTrueSuccess] = useState<boolean>(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || env !== 'development') {
      const verifyRefreshToken = async () => {
        console.log('Verifying refresh token');
        try {
          // const response =
          await refresh(undefined);

          // console.log(response);

          setIsTrueSuccess(true);
        } catch (err) {
          console.log('refresh failed' + err);
        }
      };

      if (!token) verifyRefreshToken();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (isError) {
    console.log(error);
    content = <Navigate to='/login' replace />;
  } else if (isSuccess && isTrueSuccess) {
    // console.log('success');
    content = <Outlet />;
  } else if (token && isUninitialized) {
    // console.log('token and uninit');
    // console.log(isUninitialized);
    content = <Outlet />;
  }
  return content;
};

export default PersistLogin;
