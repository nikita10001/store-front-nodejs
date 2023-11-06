import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTE_PATHS, privateRoutes, publicRoutes } from '../router';
import { useSelector } from 'react-redux';
import { selectAdmin } from '../store/slices/adminSlice';

const AppRouter = () => {
  const { isAuth } = useSelector(selectAdmin);

  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {!isAuth ? (
        <Route path="*" element={<Navigate to={ROUTE_PATHS.LOGIN} />} />
      ) : (
        privateRoutes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />)
      )}
      <Route path="*" element={<Navigate to={ROUTE_PATHS.MAIN} />} />
    </Routes>
  );
};
export default AppRouter;
