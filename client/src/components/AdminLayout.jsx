import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="mx-auto flex max-w-7xl items-center justify-end p-6 lg:px-8" aria-label="Global">
      <Sidebar />
      </div>
      
      {children}
    </div>
  );
};

export default Layout;
