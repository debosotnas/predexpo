import { configureStore } from '@reduxjs/toolkit';
import { versesSlice, addVersesAction } from './slices/versesSlice';

const store = configureStore({
  reducer: {
    [versesSlice.name]: versesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
export { addVersesAction };

// +++++++++++++++++

// import { configureStore } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/dist/query';
// import {
//   useFetchVersesQuery,
//   useLazyFetchVersesQuery,
//   versesApi,
// } from './api/versesApi';

// const store = configureStore({
//   reducer: {
//     [versesApi.reducerPath]: versesApi.reducer,
//   },
//   middleware: (getDefMid) => {
//     return getDefMid().concat(versesApi.middleware);
//   },
// });

// setupListeners(store.dispatch);

// export { store };
// export { useFetchVersesQuery, useLazyFetchVersesQuery };
