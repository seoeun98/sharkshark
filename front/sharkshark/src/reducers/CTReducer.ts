import { createSlice } from '@reduxjs/toolkit';

const CTAPIReducer = createSlice({
  name: 'CTAPIReducer',
  initialState: {
    compStatus: 0,
    problemNum: 0,
  },
  reducers: {
    setCompStatus(state, { payload: input }) {
      return { ...state, compStatus: input };
    },
    setProblemNum(state, { payload: input }) {
      return { ...state, problemNum: input };
    },
  },
});

export const { setCompStatus, setProblemNum } = CTAPIReducer.actions;
export default CTAPIReducer.reducer;
