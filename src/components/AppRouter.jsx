import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTE_PATHS, adminRoutes, privateRoutes, publicRoutes } from '../router';
import { useSelector } from 'react-redux';
import { selectAuth } from '../store/slices/authSlice';

const renderRoutes = (routes) => {
  return routes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />);
};

const AppRouter = () => {
  const { isAuth, user } = useSelector(selectAuth);
  const isAdmin = user?.role === 'admin';
  //https://prnt.sc/gMFrvYbS2cKD
  return (
    <Routes>
      {renderRoutes(publicRoutes)}
      {!isAuth ? ( //
        <Route path="*" element={<Navigate to={ROUTE_PATHS.LOGIN} />} />
      ) : (
        <>
          {renderRoutes(privateRoutes)}
          {isAdmin && renderRoutes(adminRoutes)}
        </>
      )}
      <Route path="*" element={<Navigate to={ROUTE_PATHS.MAIN} />} />
    </Routes>
  );
};
export default AppRouter;
