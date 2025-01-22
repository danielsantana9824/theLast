import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Avatar,
} from '@chakra-ui/react';
import { FiBell, FiUser } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box
      bg="white"
      px={4}
      py={2}
      borderBottom="1px"
      borderColor="gray.200"
      position="sticky"
      top={0}
      zIndex="sticky"
    >
      <Flex justify="space-between" align="center">
        <Text fontSize="lg" fontWeight="semibold">
          Welcome, {user?.username || 'User'}
        </Text>

        <Flex align="center" gap={4}>
          <IconButton
            aria-label="Notifications"
            icon={<FiBell />}
            variant="ghost"
            colorScheme="gray"
          />

          <Menu>
            <MenuButton>
              <Avatar size="sm" icon={<FiUser />} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigate('/profile')}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header; 