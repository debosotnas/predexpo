import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ConfigSliceState = {
  viewInExpertMode: boolean;
  currentSecondaryVersion: string;
};

const initialState: ConfigSliceState = {
  viewInExpertMode: false,
  currentSecondaryVersion: '',
};

const confiSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setExpertViewMode(state, action: PayloadAction<boolean>) {
      state.viewInExpertMode = action.payload;
    },
  },
});

export const { setExpertViewMode: setExpertViewModeAction } =
  confiSlice.actions;
export { confiSlice };
