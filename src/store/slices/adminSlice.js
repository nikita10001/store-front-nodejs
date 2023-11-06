import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthService } from '../../api/AuthService';

export const authAction = createAsyncThunk(
  'auth/authAction', //
  async (data, { rejectWithValue }) => {
    try {
      const response = await AuthService.auth(data);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isAuth: false,
  error: null,
  editingDeviceId: null,
  modalVisible: false,
};
const adminSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth(state, action) {
      state.isAuth = action.payload;
    },
    setEditingDeviceId(state, action) {
      state.editingDeviceId = action.payload;
    },
    setModalVisible(state, action) {
      // if (!action.payload) {
      //   state.editingDevice = null;
      // }
      state.modalVisible = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(authAction.fulfilled, (state, action) => {
      state.isAuth = action.payload;
      state.error = null;
    });
    builder.addCase(authAction.rejected, (state, action) => {
      state.isAuth = false;
      state.error = action.payload;
    });
  },
});

export const selectAdmin = (state) => state.admin;
export const { reducer: adminReducer, actions: adminActions } = adminSlice;
