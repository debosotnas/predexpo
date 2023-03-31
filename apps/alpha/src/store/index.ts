import { configureStore } from '@reduxjs/toolkit';
import {
  confiSlice,
  setExpertViewModeAction,
  updateLastSelectedVersionAction,
} from './slices/configSlice';
import {
  versesSlice,
  addVersesAction,
  removeRenderVerseAction,
  addMultiversionAction,
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
export {
  addVersesAction,
  setExpertViewModeAction,
  removeRenderVerseAction,
  addMultiversionAction,
  updateLastSelectedVersionAction,
};
