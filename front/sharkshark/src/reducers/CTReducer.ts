import { createSlice } from '@reduxjs/toolkit';

const CTAPIReducer = createSlice({
  name: 'CTAPIReducer',
  initialState: {
    compStatus: 0,
    problemNum: 0,
    CTPList: [],
    CTtimer: 0,
    solvingStatus: '',
    startime: '',
    solvedNum: [],
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
    setSolvedNum(state, { payload: input }) {
      return { ...state, solvedNum: input };
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
  setSolvedNum,
  setAllSolved,
  setAnalysisCompStatus,
} = CTAPIReducer.actions;
export default CTAPIReducer.reducer;
