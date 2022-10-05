import { createSlice } from '@reduxjs/toolkit';

const DataChartReducer = createSlice({
  name: 'DataChartReducer',
  initialState: {
    userTagInfo: {
      userId: '',
      math: 0,
      implementation: 0,
      greedy: 0,
      string: 0,
      dataStructure: 0,
      graph: 0,
      dp: 0,
      bruteforce: 0,
    },
  },
  reducers: {
    setUserTagInfo(state, { payload: input }) {
      return { ...state, userTagInfo: input };
    },
  },
});

export const { setUserTagInfo } = DataChartReducer.actions;
export default DataChartReducer.reducer;
