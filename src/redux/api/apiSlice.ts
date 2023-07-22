import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://book-catalog-server-woad.vercel.app/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;

      if (token) {
        headers.set('authorization', `${token}`);
      }

      return headers;
    },
  }),

  tagTypes: ['reviews', 'updateBook', 'createBook', 'deleteBook'],
  endpoints: () => ({}),
});
