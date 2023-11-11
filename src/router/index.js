import AdminPage from '../pages/AdminPage';
import DevicePage from '../pages/DevicePage';
import MainPage from '../pages/MainPage';
import AuthPage from '../pages/AuthPage';
import CartPage from '../pages/CartPage';

export const ROUTE_PATHS = {
  MAIN: '/devices',
  LOGIN: '/auth/login',
  ADMIN: '/admin',
  CART: '/cart',
  REGISTRATION: '/auth/registration',
};

export const publicRoutes = [
  {
    path: ROUTE_PATHS.MAIN,
    Component: MainPage,
  },
  {
    path: ROUTE_PATHS.MAIN + '/:id',
    Component: DevicePage,
  },
  {
    path: ROUTE_PATHS.LOGIN,
    Component: AuthPage,
  },
  {
    path: ROUTE_PATHS.REGISTRATION,
    Component: AuthPage,
  },
];

export const privateRoutes = [
  {
    path: ROUTE_PATHS.CART,
    Component: CartPage,
  },
];

export const adminRoutes = [
  {
    path: ROUTE_PATHS.ADMIN,
    Component: AdminPage,
  },
];
