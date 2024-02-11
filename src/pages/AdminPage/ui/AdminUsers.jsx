import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Preloader from '../../../shared/ui/Preloader';
import { formatDate } from '../../../shared/lib/formatDate';
import { $host } from 'shared/api/api';

export const AdminUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    try {
      setIsLoading(true);
      const { data } = await $host.get('/admin/users');
      setUsers(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const handleUserDelete = async (userId) => {
    try {
      const response = await $host.delete('/admin/users/' + userId);
      if (response.status == 200) {
        setUsers([...users.filter((user) => user._id !== userId)]);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  if (isLoading) {
    return <Preloader />;
  }
  return (
    <div className="page__admin admin-users">
      <div className="admin-users__container">
        <div className="admin-users__list">
          {users?.map((user) => (
            <li key={user._id} className="comments-device__item item-comment">
              <div className="item-comment__top">
                <div className="item-comment__content">
                  <h4 className="item-comment__author">{user.name}</h4>
                  <h4 className="item-comment__author">{user.login}</h4>
                  <p className="item-comment__date">Дата регистрации: {formatDate(user.createdAt)}</p>
                </div>
                <button onClick={() => handleUserDelete(user._id)} className="item-comment__delete ">
                  ×
                </button>
              </div>
              <p className="item-comment__text">Подтверждён: {user.isVerified ? 'Да' : 'Нет'}</p>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};
