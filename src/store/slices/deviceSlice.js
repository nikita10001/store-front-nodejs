import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DeviceService } from '../../api/DeviceService';

export const fetchDevices = createAsyncThunk(
  'devices/fetchDevices', //
  async function ({ query, currentPage: page, limit, rangeFrom, rangeTo, brand }, { rejectWithValue }) {
    try {
      return await DeviceService.getAllDevices(query, page, limit, rangeFrom, rangeTo, brand);
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
  devices: {
    items: [],
    isLoading: true,
    error: null,
    totalItems: 0,
    totalPages: 0,
  },
  device: {
    item: {},
    isLoading: true,
    error: null,
  },
};

const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    addDevice(state, action) {
      state.devices.items.push(action.payload);
    },
    removeDevice(state, action) {
      state.devices.items = state.devices.items.filter((device) => device._id !== action.payload);
    },
    updateDevice(state, action) {
      const foundDevice = state.devices.items.find((device) => device._id == action.payload.id);
      foundDevice = action.payload;
    },
  },
  extraReducers: (builder) => {
    //fetch all devices
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.devices.isLoading = true;
        state.devices.error = null;
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.devices.isLoading = false;
        state.devices.items = action.payload.devices;
        state.devices.totalItems = action.payload.totalItems;
        state.devices.totalPages = action.payload.totalPages;
      })
      .addCase(fetchDevices.rejected, (state, action) => {
        state.devices.isLoading = false;
        state.devices.error = action.payload;
      });
    //fetch single device
    builder
      .addCase(fetchSingleDevice.pending, (state) => {
        state.device.isLoading = true;
        state.device.error = null;
      })
      .addCase(fetchSingleDevice.fulfilled, (state, action) => {
        state.device.isLoading = false;
        state.device.item = action.payload;
      })
      .addCase(fetchSingleDevice.rejected, (state, action) => {
        state.device.isLoading = false;
        state.device.error = action.payload;
      });
  },
});

export const selectAllDevices = (state) => state.devices.devices;
export const selectSingleDevice = (state) => state.devices.device;

export const { reducer: deviceReducer, actions: deviceActions } = deviceSlice;
