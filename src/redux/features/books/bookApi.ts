import { api } from '@/redux/api/apiSlice';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => '/books/tenBook',
      providesTags: ['updateBook', 'createBook'],
    }),
    getSearchBooks: builder.query({
      query: (searchData) => `/books/search?query=${searchData}`,
      providesTags: ['updateBook', 'createBook'],
    }),
    singleBook: builder.query({
      query: (id) => `/books/${id}`,
    }),
    createBook: builder.mutation({
      query: ({
        title,
        author,
        genre,
        publication_year,
        description,
        price,
        rating,
        image,
      }) => ({
        url: `/books/create-book`,
        method: 'POST',
        body: {
          title,
          author,
          genre,
          publication_year,
          description,
          price,
          rating,
          image,
        },
      }),
      invalidatesTags: ['createBook'],
    }),
    updateBook: builder.mutation({
      query: ({
        id = '',
        title,
        author,
        genre,
        publication_year,
        description,
        price,
        rating,
        image,
      }) => ({
        url: `/books/${id}`,
        method: 'PATCH',
        body: {
          title,
          author,
          genre,
          publication_year,
          description,
          price,
          rating,
          image,
        },
      }),

      invalidatesTags: ['updateBook'],
    }),
    deleteBook: builder.mutation({
      query: ({ id }) => ({
        url: `/books/${id}`,
        method: 'DELETE',
      }),
    }),
    postReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/books/reviews/${id}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['reviews'],
    }),
    getReviews: builder.query({
      query: (id) => `/books/reviews/${id}`,
      providesTags: ['reviews'],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSearchBooksQuery,
  useSingleBookQuery,
  usePostReviewMutation,
  useGetReviewsQuery,
  useUpdateBookMutation,
  useCreateBookMutation,
  useDeleteBookMutation,
} = bookApi;
