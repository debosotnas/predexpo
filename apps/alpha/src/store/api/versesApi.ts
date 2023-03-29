import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const versesApi = createApi({
  reducerPath: 'versesReducer',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5173',
  }),
  endpoints(builder) {
    return {
      fetchVerses: builder.query({
        // providesTags,
        query: (data) => {
          const { selectedBook, selectedChapter, selectedVerse } = data;
          return {
            url: `/api/bible/${selectedBook}/${selectedChapter}/${selectedVerse}`,
            method: 'GET',
          };
        },
      }),
    };
  },
});

const { useFetchVersesQuery, useLazyFetchVersesQuery } = versesApi;
// const versesReducer = versesApi.reducer
export { useFetchVersesQuery, useLazyFetchVersesQuery, versesApi };
