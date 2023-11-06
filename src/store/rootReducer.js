import { combineReducers } from 'redux';
import { deviceReducer } from './slices/deviceSlice';
import { cartReducer } from './slices/cartSlice';
import { adminReducer } from './slices/adminSlice';
import { filterReducer } from './slices/filterSlice';

export const rootReducer = combineReducers({
  devices: deviceReducer,
  cart: cartReducer,
  admin: adminReducer,
  filter: filterReducer,
});
