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
    wrongTypeInfo: {},
    solvedTermInfo: {},
    averageProblem: [],
    averageLevel: {},
    averageCategory: {},
  },
  reducers: {
    setUserTagInfo(state, { payload: input }) {
      return { ...state, userTagInfo: input };
    },
    setWrongTypeInfo(state, { payload: input }) {
      return { ...state, wrongTypeInfo: input };
    },
    setSolvedTermInfo(state, { payload: input }) {
      return { ...state, solvedTermInfo: input };
    },
    setAverageProblem(state, { payload: input }) {
      return { ...state, averageProblem: input };
    },
    setAveragLevel(state, { payload: input }) {
      return { ...state, averageLevel: input };
    },
    setAveragCategory(state, { payload: input }) {
      return { ...state, averageCategory: input };
    },
  },
});

export const {
  setUserTagInfo,
  setWrongTypeInfo,
  setSolvedTermInfo,
  setAverageProblem,
  setAveragLevel,
  setAveragCategory,
} = DataChartReducer.actions;
export default DataChartReducer.reducer;
