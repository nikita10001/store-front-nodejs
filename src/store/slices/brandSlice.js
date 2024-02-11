import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BrandService } from 'shared/api/BrandService';

export const fetchBrands = createAsyncThunk(
  'brand/fetchBrands', //
  async function (_, { rejectWithValue }) {
    try {
      return await BrandService.getAll();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createNewBrand = createAsyncThunk(
  'brand/fetchBrands', //
  async function (newBrand, { rejectWithValue }) {
    try {
      return await BrandService.createBrand(newBrand);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  isLoading: false,
  error: undefined,
};

export const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    setBrands(state, action) {},
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { actions: brandActions } = brandSlice;
export const { reducer: brandReducer } = brandSlice;

export const getAllBrandsSelector = (state) => state.brand.items;
