import { combineReducers } from 'redux';
import { deviceReducer } from './slices/deviceSlice';
import { cartReducer } from './slices/cartSlice';
import { authReducer } from './slices/authSlice';
import { commentReducer } from './slices/commentSlice';
import { orderReducer } from './slices/orderSlice';
import { brandReducer } from './slices/brandSlice';
import { adminReducer } from 'pages/AdminPage';
import { filterReducer } from 'features/Filter';

export const rootReducer = combineReducers({
  devices: deviceReducer,
  cart: cartReducer,
  auth: authReducer,
  filter: filterReducer,
  comment: commentReducer,
  order: orderReducer,
  brand: brandReducer,
  admin: adminReducer,
});
