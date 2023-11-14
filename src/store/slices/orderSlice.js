import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userData: {
    name: '',
    lastName: '',
    phone: null,
    email: '',
  },
  products: [],
  totalPrice: null,
  cardData: null,
  isOk: false,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setTotalPrice(state, action) {
      state.totalPrice = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
    },
    setCardData(state, action) {
      state.cardData = action.payload;
      state.isOk = true;
    },
  },
});

export const { reducer: orderReducer, actions: orderActions } = orderSlice;
