import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTE_PATHS, privateRoutes, publicRoutes } from 'shared/config/router';

import { useSelector } from 'react-redux';
import { selectAuth } from '../../../../store/slices/authSlice';

import { AdminRouting } from 'pages/AdminPage';

const renderRoutes = (routes) => {
  return routes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />);
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
          {isAdmin && <Route path="/admin/*" element={<AdminRouting />} />}
        </>
      )}
      <Route path="*" element={<Navigate to={ROUTE_PATHS.MAIN} />} />
    </Routes>
  );
};
export default AppRouter;

//https://prnt.sc/gMFrvYbS2cKD
