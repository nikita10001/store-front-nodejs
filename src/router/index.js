import AdminPage from '../pages/AdminPage';
import DevicePage from '../pages/DevicePage';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import CartPage from '../pages/CartPage';

export const ROUTE_PATHS = {
  MAIN: '/devices',
  LOGIN: '/login',
  ADMIN: '/admin',
  CART: '/cart',
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
    Component: LoginPage,
  },
  {
    path: ROUTE_PATHS.CART,
    Component: CartPage,
  },
];

export const privateRoutes = [
  {
    path: ROUTE_PATHS.ADMIN,
    Component: AdminPage,
  },
];
