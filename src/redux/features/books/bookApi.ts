import { api } from '@/redux/api/apiSlice';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books/tenBook',
    }),
    getSearchBooks: builder.query({
      query: (searchData) => `/books/search?query=${searchData}`,
    }),
    singleBook: builder.query({
      query: (id) => `/books/${id}`,
    }),
    postComment: builder.mutation({
      query: ({ id, data }) => ({
        url: `comment/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['comments'],
    }),
    getComment: builder.query({
      query: (id) => `/comment/${id}`,
      providesTags: ['comments'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSearchBooksQuery,
  useSingleBookQuery,
  usePostCommentMutation,
  useGetCommentQuery,
} = bookApi;
