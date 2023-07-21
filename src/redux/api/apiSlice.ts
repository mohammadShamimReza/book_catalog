import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1' }),
  // prepareHeaders: (headers, { getState }) => {
  //   const token = (getState() as RootState).auth.token;

  //   // If we have a token set in state, let's assume that we should be passing it.
  //   if (token) {
  //     headers.set('authorization', `Bearer ${token}`);
  //   }

  //   return headers;
  // },
  tagTypes: ['comments', 'updateBook'],
  endpoints: () => ({}),
});

