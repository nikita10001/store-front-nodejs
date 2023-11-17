import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { $host } from '../../api/service';

export const sendOrderData = createAsyncThunk(
  'auth/sendOrderData', //
  async (orderData, { rejectWithValue }) => {
    try {
      console.log(orderData);
      const data = await $host.post('/order', orderData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
    },
    resetData(state, action) {
      state.userData = {};
      state.products = [];
      state.totalPrice = null;
      state.cardData = null;
    },
  },
});

export const { reducer: orderReducer, actions: orderActions } = orderSlice;
