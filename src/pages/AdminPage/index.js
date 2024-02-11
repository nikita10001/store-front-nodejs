import { AdminComments } from './ui/AdminComments';
import { AdminDeviceCreate } from './ui/AdminDeviceCreate';
import { AdminDevices } from './ui/AdminDevices';
import { AdminDeviceEdit } from './ui/AdminDeviceEdit';
import { AdminUsers } from './ui/AdminUsers';

import { Navigate, Route, Routes } from 'react-router-dom';

export const AdminRouting = () => {
  return (
    <Routes>
      <Route path="devices/create" element={<AdminDeviceCreate />} />
      <Route path="devices/edit/:deviceId" element={<AdminDeviceEdit />} />
      <Route path="devices" element={<AdminDevices />} />
      <Route path="comments" element={<AdminComments />} />
      <Route path="users" element={<AdminUsers />} />
      <Route path="*" element={<Navigate to="/admin/devices" />} />
    </Routes>
  );
};
