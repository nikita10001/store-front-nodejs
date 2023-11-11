import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthService } from '../../api/AuthService';

export const loginAction = createAsyncThunk(
  'auth/loginAction', //
  async (data, { rejectWithValue }) => {
    try {
      const user = await AuthService.login(data);
      console.log('LoginAction: ', user);
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
      console.log('Registration Action: ', user);
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
      const user = await AuthService.me();
      console.log('Check me action: ', user);

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
      // if (!action.payload) {
      //   state.editingDevice = null;
      // }
      state.modalVisible = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.isAuth = action.payload;
      state.error = null;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
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
