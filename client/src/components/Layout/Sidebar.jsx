import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Box,
  VStack,
  Link,
  Icon,
  Text,
  Flex,
} from '@chakra-ui/react';
import {
  FiHome,
  FiBox,
  FiShoppingCart,
  FiUsers,
  FiSettings,
} from 'react-icons/fi';

const NavItem = ({ icon, children, to }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      as={RouterLink}
      to={to}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        bg={isActive ? 'blue.400' : 'transparent'}
        color={isActive ? 'white' : 'gray.600'}
        _hover={{
          bg: 'blue.400',
          color: 'white',
        }}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        {children}
      </Flex>
    </Link>
  );
};

const Sidebar = () => {
  return (
    <Box
      bg="white"
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      borderRight="1px"
      borderRightColor="gray.200"
    >
      <VStack h="full" spacing={0} align="stretch">
        <Box p="5">
          <Text fontSize="2xl" fontWeight="bold" color="blue.500">
            RMS
          </Text>
        </Box>

        <VStack spacing={1} align="stretch" flex={1}>
          <NavItem icon={FiHome} to="/">
            Dashboard
          </NavItem>
          <NavItem icon={FiBox} to="/inventory">
            Inventory
          </NavItem>
          <NavItem icon={FiShoppingCart} to="/orders">
            Orders
          </NavItem>
          <NavItem icon={FiUsers} to="/customers">
            Customers
          </NavItem>
        </VStack>

        <Box p={4}>
          <NavItem icon={FiSettings} to="/settings">
            Settings
          </NavItem>
        </Box>
      </VStack>
    </Box>
  );
};

export default Sidebar; 