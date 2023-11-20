import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommentService } from '../../api/CommentService';

export const fetchDevicesComments = createAsyncThunk(
  'comment/fetchDevicesComments', //
  async function (id, { rejectWithValue }) {
    try {
      return await CommentService.getDevicesComments(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const createComment = createAsyncThunk(
  'comment/addComment', //
  async function ({ deviceId, text, rating }, { rejectWithValue, dispatch }) {
    try {
      const data = await CommentService.addComment(deviceId, text, rating);
      dispatch(commenctActions.addComment(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const removeComment = createAsyncThunk(
  'comment/removeComment', //
  async function (commentId, { rejectWithValue, dispatch }) {
    try {
      const data = await CommentService.removeComment(commentId);
      dispatch(commenctActions.deleteComment(commentId));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  isLoading: true,
  error: null,
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    addComment(state, action) {
      state.items.push(action.payload);
    },
    deleteComment(state, action) {
      state.items = state.items.filter((comment) => comment._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDevicesComments.pending, (state) => {
      state.isLoading = true;
      state.items = null;
    });
    builder.addCase(fetchDevicesComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchDevicesComments.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { reducer: commentReducer, actions: commenctActions } = commentSlice;
