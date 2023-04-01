import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ConfigSliceState = {
  viewInExpertMode: boolean;
  currentSecondaryVersion: string;
  lastVersionSelected: string;
};

const initialState: ConfigSliceState = {
  viewInExpertMode: false,
  currentSecondaryVersion: '',
  lastVersionSelected: 'RVR1960',
};

const confiSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setExpertViewMode(state, action: PayloadAction<boolean>) {
      state.viewInExpertMode = action.payload;
    },
    updateLastSelectedVersion(state, action: PayloadAction<string>) {
      state.lastVersionSelected = action.payload;
    },
  },
});

export const {
  setExpertViewMode: setExpertViewModeAction,
  updateLastSelectedVersion: updateLastSelectedVersionAction,
} = confiSlice.actions;
export { confiSlice };
