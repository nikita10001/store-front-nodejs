import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTE_PATHS, privateRoutes, publicRoutes } from '../router';
import { useSelector } from 'react-redux';
import { selectAuth } from '../store/slices/authSlice';
import AdminDeviceEdit from '../pages/admin/AdminDeviceEdit';
import AdminComments from '../pages/admin/AdminComments';
import AdminDevices from '../pages/admin/AdminDevices';
import CheckEmailPage from '../pages/CheckEmailPage';
import AdminUsers from '../pages/admin/AdminUsers';
const renderRoutes = (routes) => {
  return routes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />);
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="devices/create" element={<AdminDeviceEdit />} />
      <Route path="devices/edit/:deviceId" element={<AdminDeviceEdit />} />
      <Route path="devices" element={<AdminDevices />} />
      <Route path="comments" element={<AdminComments />} />
      <Route path="users" element={<AdminUsers />} />
      <Route path="*" element={<Navigate to="/admin/devices" />} />
    </Routes>
  );
};

const AppRouter = () => {
  const { isAuth, user } = useSelector(selectAuth);
  const isAdmin = user?.role === 'admin';
  return (
    <Routes>
      {renderRoutes(publicRoutes)}
      {!isAuth ? ( //
        <Route path="*" element={<Navigate to={ROUTE_PATHS.LOGIN} />} />
      ) : (
        <>
          {renderRoutes(privateRoutes)}
          {isAdmin && <Route path="/admin/*" element={<AdminRoutes />} />}
        </>
      )}
      <Route path="*" element={<Navigate to={ROUTE_PATHS.MAIN} />} />
    </Routes>
  );
};
export default AppRouter;

//https://prnt.sc/gMFrvYbS2cKD
