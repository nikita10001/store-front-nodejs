import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { $host } from '../../api/service';

export const sendOrderData = createAsyncThunk(
  'auth/sendOrderData', //
  async (orderData, { rejectWithValue }) => {
    try {
      const data = await $host.post('/order', orderData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const confirmEmail = createAsyncThunk(
  'auth/confirmEmail', //
  async (confirmData, { rejectWithValue }) => {
    try {
      const data = await $host.post('/order/confirm', confirmData);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const checkConfirm = createAsyncThunk(
  'auth/checkConfirm', //
  async (temp, { rejectWithValue }) => {
    try {
      const data = await $host.post('/order/check/confirm', temp);
      console.log('data from confirmEmail');
      console.log(data);
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
  isOk: false,
  isEmailConfirmed: false,
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
    setConfirmed(state) {
      state.isEmailConfirmed = true;
    },
  },
});

export const { reducer: orderReducer, actions: orderActions } = orderSlice;
