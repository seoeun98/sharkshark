import { createSlice } from '@reduxjs/toolkit';
import { solvedData } from '../types/DataTypes';

const CTAPIReducer = createSlice({
  name: 'CTAPIReducer',
  initialState: {
    compStatus: 0,
    problemNum: 0,
    CTPList: [],
    CTtimer: 0,
    solvingStatus: '',
    startime: '',
    solvedList: [],
    sovledResultData: [],
    allsolved: false,

    analysisCompStatus: 0,
  },
  reducers: {
    setCompStatus(state, { payload: input }) {
      return { ...state, compStatus: input };
    },
    setProblemNum(state, { payload: input }) {
      return { ...state, problemNum: input };
    },
    setCTPList(state, { payload: input }) {
      return { ...state, CTPList: input };
    },
    setTimer(state, { payload: input }) {
      return { ...state, CTtimer: input };
    },
    setSolvingStatus(state, { payload: input }) {
      return { ...state, solvingStatus: input };
    },
    setStarttime(state, { payload: input }) {
      return { ...state, startime: input };
    },
    setSolvedList(state, { payload: input }) {
      return { ...state, solvedList: input };
    },
    setSovledResultData(state, { payload: input }) {
      return { ...state, sovledResultData: input };
    },
    setAllSolved(state, { payload: input }) {
      return { ...state, allsolved: input };
    },
    setAnalysisCompStatus(state, { payload: input }) {
      return { ...state, analysisCompStatus: input };
    },
  },
});

export const {
  setCompStatus,
  setProblemNum,
  setCTPList,
  setTimer,
  setSolvingStatus,
  setStarttime,
  setSolvedList,
  setSovledResultData,
  setAllSolved,
  setAnalysisCompStatus,
} = CTAPIReducer.actions;
export default CTAPIReducer.reducer;
