import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CartService } from '../../api/CartService';

export const getProductsFromCart = createAsyncThunk(
  'cart/getProductsFromCart', //
  async function (userId, { rejectWithValue }) {
    try {
      const data = await CartService.getCart(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addProductToCart = createAsyncThunk(
  'cart/addProductToCart', //
  async function (deviceId, { rejectWithValue, dispatch }) {
    try {
      const data = await CartService.addToCart(deviceId);
      dispatch(cartActions.addToCart(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteProductFromCart = createAsyncThunk(
  'cart/deleteProductFromCart', //
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const data = await CartService.deleteFromCart(id);
      dispatch(cartActions.removeFromCart(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  cart: [],
  error: null,
  isLoading: false,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart.push(action.payload);
    },
    removeFromCart(state, action) {
      state.cart = state.cart.filter((device) => device._id !== action.payload);
    },
    clearCart(state, action) {
      state.cart = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsFromCart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getProductsFromCart.fulfilled, (state, action) => {
      state.isLoading = false;
      state.cart = action.payload;
    });
    builder.addCase(getProductsFromCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(addProductToCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { reducer: cartReducer, actions: cartActions } = cartSlice;
