import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { VerseData } from '../../types/verses';

type VersesSliceState = {
  dataLoaded: VerseData[];
  dataRendered: VerseData[];
};
const initialState: VersesSliceState = { dataLoaded: [], dataRendered: [] };

const versesSlice = createSlice({
  name: 'verses',
  initialState,
  reducers: {
    addVerses(state, action: PayloadAction<VerseData>) {
      console.log('>> addVerses reducer: ', action.payload);
      state.dataLoaded.push(action.payload);
      state.dataRendered.push(action.payload);
    },
    removeRenderVerse(state, action: PayloadAction<string>) {
      const idx = state.dataRendered.findIndex(
        (v: VerseData) => v.id === action.payload
      );
      state.dataRendered.splice(idx, 1);
    },
  },
});

export const {
  addVerses: addVersesAction,
  removeRenderVerse: removeRenderVerseAction,
} = versesSlice.actions;
export { versesSlice };
