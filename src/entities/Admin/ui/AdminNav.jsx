import React, { memo } from 'react';
import { ROUTE_PATHS } from 'shared/config/router';

import { NavLink } from 'react-router-dom';

export const AdminNav = memo(({ isAdmin }) => {
  if (!isAdmin) {
    return null;
  }
  return (
    <div className="header__admin admin-nav">
      <div className="admin-nav__container">
        <ul className="admin-nav__menu">
          <li className="admin-nav__item">
            <NavLink to={ROUTE_PATHS.ADMIN_COMMENTS} className="admin-nav__link">
              Комментарии
            </NavLink>
          </li>
          <li className="admin-nav__item">
            <NavLink to={ROUTE_PATHS.ADMIN} className="admin-nav__link">
              Товары
            </NavLink>
          </li>{' '}
          <li className="admin-nav__item">
            <NavLink to={ROUTE_PATHS.ADMIN_USERS} className="admin-nav__link">
              Пользователи
            </NavLink>
          </li>{' '}
          <li className="admin-nav__item">
            <NavLink to={ROUTE_PATHS.ADMIN_BRANDS} className="admin-nav__link">
              Производители
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
});
