import { Box, VStack, Icon, Text, Link as ChakraLink } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiBox, 
  FiShoppingCart, 
  FiUsers, 
  FiBarChart2, 
  FiSettings 
} from 'react-icons/fi';

const menuItems = [
  { icon: FiHome, label: 'Dashboard', path: '/dashboard' },
  { icon: FiBox, label: 'Inventory', path: '/inventory' },
  { icon: FiShoppingCart, label: 'Orders', path: '/orders' },
  { icon: FiUsers, label: 'Customers', path: '/customers' },
  { icon: FiBarChart2, label: 'Analytics', path: '/analytics' },
  { icon: FiSettings, label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <Box
      as="nav"
      w="240px"
      bg="white"
      borderRight="1px"
      borderColor="gray.200"
      py={8}
    >
      <VStack spacing={2} align="stretch">
        {menuItems.map((item) => (
          <ChakraLink
            as={Link}
            to={item.path}
            key={item.path}
            display="flex"
            alignItems="center"
            px={6}
            py={3}
            color={location.pathname === item.path ? 'brand.600' : 'gray.600'}
            bg={location.pathname === item.path ? 'brand.50' : 'transparent'}
            _hover={{ bg: 'brand.50', color: 'brand.600' }}
          >
            <Icon as={item.icon} mr={4} />
            <Text fontWeight="medium">{item.label}</Text>
          </ChakraLink>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar; 