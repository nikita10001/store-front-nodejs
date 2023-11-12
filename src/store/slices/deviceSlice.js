import { clearAllListeners, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DeviceService } from '../../api/DeviceService';

export const fetchDevices = createAsyncThunk(
  'devices/fetchDevices', //
  async function ({ query, currentPage: page, limit, rangeFrom, rangeTo }, { rejectWithValue }) {
    try {
      return await DeviceService.getAllDevices(query, page, limit, rangeFrom, rangeTo);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchSingleDevice = createAsyncThunk(
  'devices/fetchSingleDevice', //
  async function (id, { rejectWithValue }) {
    try {
      return await DeviceService.getDevice(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchDevicesComments = createAsyncThunk(
  'devices/fetchDevicesComments', //
  async function (id, { rejectWithValue }) {
    try {
      return await DeviceService.getDevicesComments(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createComment = createAsyncThunk(
  'devices/addComment', //
  async function ({ deviceId, text }, { rejectWithValue, dispatch }) {
    try {
      const data = await DeviceService.addComment(deviceId, text);
      dispatch(deviceActions.addComment(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const removeComment = createAsyncThunk(
  'devices/removeComment', //
  async function (commentId, { rejectWithValue, dispatch }) {
    try {
      const data = await DeviceService.removeComment(commentId);
      dispatch(deviceActions.deleteComment(commentId));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createDevice = createAsyncThunk(
  'devices/createDevice', //
  async function (device, { rejectWithValue, dispatch }) {
    try {
      const data = await DeviceService.addDevice(device);
      dispatch(deviceActions.addDevice(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateDevice = createAsyncThunk(
  'devices/updateDevice', //
  async function (device, { rejectWithValue, dispatch }) {
    try {
      const data = await DeviceService.updateDevice(device.id, device);
      dispatch(deviceActions.updateDevice(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const removeDevice = createAsyncThunk(
  'devices/removeDevice', //
  async function (id, { rejectWithValue, dispatch }) {
    try {
      const data = await DeviceService.removeDevice(id);
      dispatch(deviceActions.removeDevice(id));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  devices: [],
  device: {},
  comments: {
    items: [],
    isLoading: true,
    error: null,
  },
  isLoading: false,
  error: null,
  totalItems: 0,
  totalPages: 0,
};

const setStart = (state) => {
  state.isLoading = true;
  state.error = null;
};
const setError = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    addDevice(state, action) {
      state.devices.push(action.payload);
    },
    removeDevice(state, action) {
      state.devices = state.devices.filter((device) => device._id !== action.payload);
    },
    updateDevice(state, action) {
      const foundDevice = state.devices.find((device) => device._id == action.payload.id);
      foundDevice = action.payload;
    },
    ///////??????????????????????????????????????/
    addComment(state, action) {
      state.comments.items = [action.payload, ...state.comments.items];
      // state.comments.items.push(action.payload);
    },
    deleteComment(state, action) {
      state.comments.items = state.comments.items.filter((comment) => comment._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDevices.pending, setStart);
    builder.addCase(fetchDevices.fulfilled, (state, action) => {
      state.isLoading = false;
      state.devices = action.payload.devices;
      state.totalItems = action.payload.totalItems;
      state.totalPages = action.payload.totalPages;
    });
    builder.addCase(fetchDevices.rejected, setError);
    builder.addCase(fetchSingleDevice.pending, setStart);
    builder.addCase(fetchSingleDevice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.device = action.payload;
    });
    builder.addCase(fetchSingleDevice.rejected, setError);

    builder.addCase(fetchDevicesComments.pending, (state) => {
      state.comments.isLoading = true;
      state.comments.items = null;
    });
    builder.addCase(fetchDevicesComments.fulfilled, (state, action) => {
      state.comments.isLoading = false;
      state.comments.items = action.payload;
    });
    builder.addCase(fetchDevicesComments.rejected, (state, action) => {
      state.comments.isLoading = false;
      state.comments.error = action.payload;
    });
  },
});

export const selectDevices = (state) => state.devices;

export const { reducer: deviceReducer, actions: deviceActions } = deviceSlice;
