/* eslint-disable react/prop-types */
import { Suspense } from 'react';
// import { Outlet } from 'react-router-dom';

import Header from './Layout/Header';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../redux/auth/selectors';

export const Layout = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div>
      {isLoggedIn && <Header />}
      <Suspense fallback={null}>{children}</Suspense>
    </div>
  );
};
