import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DeviceService } from 'shared/api/DeviceService';

export const createDevice = createAsyncThunk(
  'admin/createDevice', //
  async function (device, { rejectWithValue, dispatch, getState }) {
    try {
      const { _id: brand } = getState().brand.items.find((br) => br.value == device.brand);
      const data = await DeviceService.addDevice({ ...device, brand });
      // dispatch(deviceActions.addDevice(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const updateDevice = createAsyncThunk(
  'admin/updateDevice', //
  async function (device, { rejectWithValue, dispatch, getState }) {
    try {
      const brand = getState().brand.items.find((br) => br.value == device.brand);
      const brandId = brand._id;
      const data = await DeviceService.updateDevice(device._id, device, brandId);

      dispatch(
        adminActions.updateDevice({
          ...device,
          brand: brand.value,
        })
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//////temp!!!!!!!
export const fetchAdminDevice = createAsyncThunk(
  'admin/fetchAdminDevice', //
  async function (id, { rejectWithValue }) {
    try {
      const device = await DeviceService.getDevice(id);
      return {
        ...device,
        brand: device.brand.value,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const EMPTY_DEVICE_STATE = {
  name: '',
  price: '',
  rating: '',
  img: '',
  description: '',
  brand: '',
  characteristics: [],
};

const initialState = {
  device: EMPTY_DEVICE_STATE,
  isLoading: false,
  error: null,
};

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    updateDevice(state, action) {
      state.device = {
        ...state.device,
        ...action.payload,
      };
    },
    clearDevice(state) {
      state.device = EMPTY_DEVICE_STATE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDevice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createDevice.fulfilled, (state) => {
        state.device = EMPTY_DEVICE_STATE;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(createDevice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //fetch single device
      .addCase(fetchAdminDevice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAdminDevice.fulfilled, (state, action) => {
        state.device = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchAdminDevice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      //update admin device
      .addCase(updateDevice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateDevice.fulfilled, (state, action) => {
        // state.device = EMPTY_DEVICE_STATE;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(updateDevice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  reducer: adminReducer, //
  actions: adminActions,
} = adminSlice;
