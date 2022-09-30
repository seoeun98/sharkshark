import { createSlice } from '@reduxjs/toolkit';

const ghAPIReducer = createSlice({
  name: 'ghAPIReducer',
  initialState: {
    authToken: '',
    repo: {
      name: '',
      url: '',
      dir: '',
    },
  },
  reducers: {
    setAuthToken(state, { payload: input }) {
      return { ...state, authToken: input };
    },
    setRepo(state, { payload: input }) {
      return { ...state, repo: input };
    },
  },
});

export const { setAuthToken, setRepo } = ghAPIReducer.actions;
export default ghAPIReducer.reducer;
