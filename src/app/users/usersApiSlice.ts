import { apiSlice } from '../apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (userData) => ({
        url: '/users',
        method: 'POST',
        body: {
          ...userData,
        },
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: '/users',
        method: 'PATCH',
        body: {
          ...userData,
        },
      }),
      invalidatesTags: (_result, _error, arg) => [{ type: 'User', id: arg.id }],
    }),
  }),
});

export const { useRegisterUserMutation, useUpdateUserMutation } = usersApiSlice;
