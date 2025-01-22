import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
  return (
    <Flex h="100vh">
      <Sidebar />
      <Box flex="1" overflow="auto">
        <Header />
        <Box as="main" p={4}>
          <Outlet />
        </Box>
      </Box>
    </Flex>
  );
};

export default Layout; 