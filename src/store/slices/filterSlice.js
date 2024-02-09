import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  query: '',
  range: {
    from: null,
    to: null,
  },
  brand: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    setRange(state, action) {
      state.range.from = Number(action.payload.from);
      state.range.to = Number(action.payload.to);
    },
    setBrand(state, action) {
      state.brand = action.payload;
    },
    clearAll(state) {
      state.query = '';
      state.range = null;
      state.brand = '';
    },
  },
});

export const selectFilter = (state) => state.filter;

export const { reducer: filterReducer, actions: filterActions } = filterSlice;
