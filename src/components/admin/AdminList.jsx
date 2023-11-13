import React from 'react';
import AdminItem from './AdminItem';

const AdminList = ({ items }) => {
  return (
    <div className="admin__list ">
      {!items.length && <h4 className="error-title">Устройств нет!</h4>}
      {items.map((item) => (
        <AdminItem //
          key={item._id}
          id={item._id}
          {...item}
        />
      ))}
    </div>
  );
};

export default AdminList;
