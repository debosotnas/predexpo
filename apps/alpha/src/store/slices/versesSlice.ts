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
  },
});

export const { addVerses: addVersesAction } = versesSlice.actions;
export { versesSlice };
