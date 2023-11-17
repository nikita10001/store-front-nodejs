import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTE_PATHS, adminRoutes, privateRoutes, publicRoutes } from '../router';
import { useSelector } from 'react-redux';
import { selectAuth } from '../store/slices/authSlice';
import AdminDeviceEdit from '../pages/AdminDeviceEdit';
import AdminComments from '../pages/AdminComments';
import AdminDevices from '../pages/AdminDevices';
import CheckEmailPage from '../pages/CheckEmailPage';
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
      <Route path="/auth/check/email/:token" element={<CheckEmailPage />} />
      <Route path="*" element={<Navigate to={ROUTE_PATHS.MAIN} />} />
    </Routes>
  );
};
export default AppRouter;

//https://prnt.sc/gMFrvYbS2cKD
