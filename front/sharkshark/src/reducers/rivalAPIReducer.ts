import { createSlice } from '@reduxjs/toolkit';

const rivalAPIReducer = createSlice({
  name: 'rivalAPIReducer',
  initialState: {
    compStatus: '',
    userInfo: {},
    rivalInfo: {},
    rivalList: [],
    rivalRecList: [],
    clickedRivalId: '',
  },
  reducers: {
    setCompStatus(state, { payload: input }) {
      return { ...state, compStatus: input };
    },
    setUserInfo(state, { payload: input }) {
      return { ...state, userInfo: input };
    },
    setRivalInfo(state, { payload: input }) {
      return { ...state, rivalInfo: input };
    },
    setRivalList(state, { payload: input }) {
      return { ...state, rivalList: input };
    },
    setRecRivalList(state, { payload: input }) {
      return { ...state, rivalRecList: input };
    },
    setClickedRivalId(state, { payload: input }) {
      return { ...state, clickedRivalId: input };
    },
  },
});

export const {
  setCompStatus,
  setUserInfo,
  setRivalInfo,
  setRivalList,
  setRecRivalList,
  setClickedRivalId,
} = rivalAPIReducer.actions;
export default rivalAPIReducer.reducer;
