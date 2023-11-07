import { clearAllListeners, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DeviceService } from '../../api/DeviceService';

export const fetchDevices = createAsyncThunk(
  'devices/fetchDevices', //
  async function ({ query, rangeFrom, rangeTo, limit, skip }, { rejectWithValue }) {
    try {
      return await DeviceService.getAllDevices(query, rangeFrom, rangeTo, limit, skip);
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
  isLoading: false,
  totalCount: null,
  skip: 0,
  error: null,
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
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDevices.pending, setStart);
    builder.addCase(fetchDevices.fulfilled, (state, action) => {
      state.isLoading = false;
      state.devices = action.payload;
      // state.totalCount = action.payload.totalCount;
      // state.skip = action.payload.skip;
    });
    builder.addCase(fetchDevices.rejected, setError);
    builder.addCase(fetchSingleDevice.pending, setStart);
    builder.addCase(fetchSingleDevice.fulfilled, (state, action) => {
      state.isLoading = false;
      state.device = action.payload;
    });
    builder.addCase(fetchSingleDevice.rejected, setError);
  },
});

export const selectDevices = (state) => state.devices;

export const { reducer: deviceReducer, actions: deviceActions } = deviceSlice;
