import React from 'react';
import { Box, Flex, Button, Heading, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const bgColor = useColorModeValue('white', 'gray.800');
  const isLoggedIn = Auth.loggedIn();

  const handleLogout = () => {
    Auth.logout();
    navigate('/login');
  };

  return (
    <Box bg={bgColor} px={4} shadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading as={RouterLink} to="/" size="md">
          Restaurant Manager
        </Heading>

        {isLoggedIn ? (
          <Flex alignItems="center" gap={4}>
            <Button as={RouterLink} to="/inventory" variant="ghost">
              Inventory
            </Button>
            <Button as={RouterLink} to="/orders" variant="ghost">
              Orders
            </Button>
            <Button as={RouterLink} to="/customers" variant="ghost">
              Customers
            </Button>
            <Button as={RouterLink} to="/analytics" variant="ghost">
              Analytics
            </Button>
            <Button onClick={handleLogout} colorScheme="red" variant="outline">
              Logout
            </Button>
          </Flex>
        ) : (
          <Button as={RouterLink} to="/login" colorScheme="blue">
            Login
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar; 