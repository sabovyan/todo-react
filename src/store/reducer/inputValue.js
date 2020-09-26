import { createSlice } from '@reduxjs/toolkit';

export const { reducer, actions } = createSlice({
  name: 'inputValue',
  initialState: '',
  reducers: {
    setInputValue: (_state, { payload }) => `${payload}`,
  },
});

export const { setInputValue } = actions;

export default reducer;
