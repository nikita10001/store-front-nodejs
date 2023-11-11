import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthService } from '../../api/AuthService';

export const loginAction = createAsyncThunk(
  'auth/loginAction', //
  async (data, { rejectWithValue }) => {
    try {
      const user = await AuthService.login(data);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerAction = createAsyncThunk(
  'auth/registerAction', //
  async (data, { rejectWithValue }) => {
    try {
      const user = await AuthService.registration(data);
      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth', //
  async (data, { rejectWithValue }) => {
    try {
      const user = await AuthService.check();
      return user;
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
      state.isAuth = action.payload;
    },
    setEditingDeviceId(state, action) {
      state.editingDeviceId = action.payload;
    },
    setModalVisible(state, action) {
      state.modalVisible = action.payload;
    },
    setLogout(state) {
      state.isAuth = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.isAuth = false;
      state.user = null;
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
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isAuth = true;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.user = null;
      state.isAuth = false;
    });
  },
});

export const selectAuth = (state) => state.auth;
export const { reducer: authReducer, actions: authActions } = authSlice;
