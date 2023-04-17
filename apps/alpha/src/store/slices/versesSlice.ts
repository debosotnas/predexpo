import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ExternalVerseData, VerseData } from '../../types/verses';

type MultiVersionGroup = { [id: string]: ExternalVerseData };

export interface MultiversionStoreData {
  [v: string]: MultiVersionGroup;
}

type VersesSliceState = {
  dataLoaded: VerseData[];
  dataRendered: VerseData[];
  dataMultiversion: MultiversionStoreData;
};
const initialState: VersesSliceState = {
  dataLoaded: [],
  dataRendered: [],
  dataMultiversion: {},
};

const getUpdateStateForMultiversion = (
  state: any,
  payload: ExternalVerseData,
  vGroup: MultiVersionGroup
) => {
  if (vGroup && Object.keys(vGroup).length) {
    return {
      ...state,
      dataMultiversion: {
        ...state.dataMultiversion,
        [payload.version]: { ...vGroup, [payload.id]: payload },
      },
    };
  } else {
    return {
      ...state,
      dataMultiversion: {
        ...state.dataMultiversion,
        [payload.version]: { [payload.id]: payload },
      },
    };
  }
};

const versesSlice = createSlice({
  name: 'verses',
  initialState,
  reducers: {
    addVerses(state, action: PayloadAction<VerseData[]>) {
      state.dataLoaded.push(...action.payload);
      state.dataRendered.push(...action.payload);
    },
    removeRenderVerse(state, action: PayloadAction<string>) {
      const idx = state.dataRendered.findIndex(
        (v: VerseData) => v.id === action.payload
      );
      state.dataRendered.splice(idx, 1);
    },
    addMultiversion(
      state,
      action: PayloadAction<ExternalVerseData | ExternalVerseData[]>
    ) {
      if (!Array.isArray(action.payload)) {
        const vGroup: MultiVersionGroup =
          state.dataMultiversion[action.payload.version];

        return getUpdateStateForMultiversion(state, action.payload, vGroup);
        // if (Array.isArray(vGroup)) {
        //   vGroup.push(action.payload);
        //   return {
        //     ...state,
        //     dataMultiversion: {
        //       ...state.dataMultiversion,
        //       [action.payload.version]: vGroup,
        //     },
        //   };
        // } else {
        //   return {
        //     ...state,
        //     dataMultiversion: {
        //       ...state.dataMultiversion,
        //       [action.payload.version]: [action.payload],
        //     },
        //   };
        // }
      } else {
        return action.payload.reduce((prev: any, curr: ExternalVerseData) => {
          const vGroup: MultiVersionGroup = prev.dataMultiversion[curr.version];
          return getUpdateStateForMultiversion(prev, curr, vGroup);
        }, state);
      }
    },
  },
});

export const {
  addVerses: addVersesAction,
  removeRenderVerse: removeRenderVerseAction,
  addMultiversion: addMultiversionAction,
} = versesSlice.actions;
export { versesSlice };
