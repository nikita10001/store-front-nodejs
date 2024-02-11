import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AuthService } from 'shared/api/AuthService';

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

export const checkEmail = createAsyncThunk(
  'auth/checkEmail', //
  async ({ login, confirmationCode }, { rejectWithValue }) => {
    try {
      const data = await AuthService.checkEmail(login, confirmationCode);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  isAuth: false,
  error: null,
  user: null,
  isLoading: true,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsAuth(state, action) {
      state.isAuth = action.payload;
    },
    setLogout(state) {
      state.isAuth = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    //login
    builder
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isAuth = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isAuth = false;
        state.user = null;
        state.error = action.payload;
      });
    //check is auth
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
    });
    //register
    builder
      .addCase(checkAuth.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.user = null;
        state.isAuth = false;
        state.isLoading = false;
        state.error = action.payload;
      });
    //check email
    builder
      .addCase(checkEmail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkEmail.fulfilled, (state) => {
        state.user.isVerified = true;
        state.isLoading = false;
      })
      .addCase(checkEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const selectAuth = (state) => state.auth;
export const selecAuthIsLoading = (state) => state.auth.isLoading;

export const { reducer: authReducer, actions: authActions } = authSlice;
