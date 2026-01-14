import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import type { RootState } from './store';
import { CredentialsPayload, logOut, setCredentials } from './auth/authSlice';

const API_URL = import.meta.env.VITE_API_BASE_URL;

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 403) {
    console.log('Sending refresh token...');

    const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);

    if (refreshResult.data) {
      const data = refreshResult.data as CredentialsPayload;
      api.dispatch(setCredentials({ ...data }));

      // retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult.error?.status === 403) {
        api.dispatch(logOut());
        (refreshResult.error.data as { message?: string }).message =
          'Your login has expired.';
        console.log('Your login has expired.');
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Todo', 'Project', 'User'],
  endpoints: (_builder) => ({}),
});
