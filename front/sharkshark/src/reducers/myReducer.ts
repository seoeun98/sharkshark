import { createSlice } from '@reduxjs/toolkit';

const myReducer = createSlice({
  name: 'myReducer',
  initialState: {
    myState: '',
  },
  reducers: {
    setMyState(state, { payload: input }) {
      return { ...state, myState: input };
    },
  },
});

export const { setMyState } = myReducer.actions;
export default myReducer.reducer;
