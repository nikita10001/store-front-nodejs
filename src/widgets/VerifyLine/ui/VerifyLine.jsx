import React from 'react';

import { ROUTE_PATHS } from 'shared/config/router';

import { NavLink } from 'react-router-dom';

export const VerifyLine = () => {
  return (
    <div className="verify-info">
      <div className="verify-info__container">
        <p className="verify-info__text">
          <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM11.25 13.5V8.25H12.75V13.5H11.25ZM11.25 15.75V14.25H12.75V15.75H11.25Z"
              fill="red"
            />
          </svg>
          <span>Почта не подтверждена</span>
          <NavLink to={ROUTE_PATHS.CHECKMAIL} className="verify-info__check">
            Подтвердить
          </NavLink>
        </p>
      </div>
    </div>
  );
};
