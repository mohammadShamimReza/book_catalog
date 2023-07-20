import { api } from '@/redux/api/apiSlice';

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: ({ name, email, password, phone, address }) => ({
        url: 'users/create-user',
        method: 'POST',
        body: { name, email, password, address, phone },
      }),
    }),
  }),
});

export const { useCreateUserMutation } = userApi;
