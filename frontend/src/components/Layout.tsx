import React from 'react';
import { Box } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout: React.FC = () => {
  return (
    <Box minH="100vh">
      <Navbar />
      <Box p={4}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout; 