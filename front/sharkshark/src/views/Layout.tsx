import { Outlet } from 'react-router-dom';
import { NavBar } from '../components/common/NavBar';
import React, { useEffect, useState } from 'react';
import { getUserID } from '../api/common';

export const Layout = () => {
  const [isLogined, setLogined] = useState(false);

  useEffect(() => {
    const userId = getUserID();
    if (userId !== '') {
      setLogined(true);
    } else {
      setLogined(false);
    }
  }, []);

  return (
    <div>
      <NavBar status={isLogined} />
      <Outlet />
    </div>
  );
};
