import { configureStore } from '@reduxjs/toolkit';
import { confiSlice, setExpertViewModeAction } from './slices/configSlice';
import {
  versesSlice,
  addVersesAction,
  removeRenderVerseAction,
} from './slices/versesSlice';

const store = configureStore({
  reducer: {
    [versesSlice.name]: versesSlice.reducer,
    [confiSlice.name]: confiSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
export { addVersesAction, setExpertViewModeAction, removeRenderVerseAction };
