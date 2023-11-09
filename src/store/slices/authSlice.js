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

export const registerAction = createAsyncThunk(
  'auth/registerAction', //
  async (data, { rejectWithValue }) => {
    try {
      const response = await AuthService.register(data);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isAuth: false,
  error: null,
  user: null,
  editingDeviceId: null,
  modalVisible: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth(state, action) {
      console.log(action.payload);
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
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      state.isAuth = false;
      state.user = null;
      state.error = action.payload;
    });
  },
});

export const selectAuth = (state) => state.auth;
export const { reducer: authReducer, actions: authActions } = authSlice;
