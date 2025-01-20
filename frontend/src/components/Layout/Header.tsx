import { 
  Box, 
  Flex, 
  IconButton, 
  Menu, 
  MenuButton, 
  MenuList, 
  MenuItem, 
  Text 
} from '@chakra-ui/react';
import { FiUser, FiBell } from 'react-icons/fi';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <Box 
      as="header" 
      bg="white" 
      borderBottom="1px" 
      borderColor="gray.200" 
      py={4} 
      px={8}
    >
      <Flex justify="space-between" align="center">
        <Text fontSize="xl" fontWeight="bold" color="brand.600">
          Business Management System
        </Text>
        
        <Flex align="center" gap={4}>
          <IconButton
            aria-label="Notifications"
            icon={<FiBell />}
            variant="ghost"
          />
          
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<FiUser />}
              variant="ghost"
            />
            <MenuList>
              <Text px={3} py={2} color="gray.500">
                {user?.email}
              </Text>
              <MenuItem onClick={logout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header; 