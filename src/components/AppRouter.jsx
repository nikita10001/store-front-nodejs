import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTE_PATHS, adminRoutes, privateRoutes, publicRoutes } from '../router';
import { useSelector } from 'react-redux';
import { selectAuth } from '../store/slices/authSlice';
import AdminPage from '../pages/AdminPage';
import CreateProduct from '../components/admin/CreateProduct';
import EditProduct from '../components/admin/EditProduct';

const renderRoutes = (routes) => {
  return routes.map(({ path, Component }) => <Route key={path} path={path} element={<Component />} />);
};

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="createProduct" element={<CreateProduct />} />
      <Route path="editProduct" element={<EditProduct />} />
      <Route path="devices" element={<AdminPage />} />
      <Route path="comments" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/admin/products" />} />
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
