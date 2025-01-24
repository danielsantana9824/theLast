import Auth from "../../utils/auth";
import { Link as RouterLink } from "react-router-dom";
import {
  Box,
  Flex,
  Button,
  Text,
  Container,
  HStack,
  IconButton,
  Link,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART } from '../../utils/actions';

function Nav() {
  const [state, dispatch] = useStoreContext();

  const toggleCart = () => {
    dispatch({ type: TOGGLE_CART });
  };

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <HStack spacing={4}>
          <Link
            as={RouterLink}
            to="/orderHistory"
            color="gray.300"
            _hover={{ color: 'white', textDecoration: 'none' }}
          >
            Order History
          </Link>
          <Button
            variant="ghost"
            color="gray.300"
            _hover={{ bg: 'whiteAlpha.200', color: 'white' }}
            onClick={() => Auth.logout()}
          >
            Logout
          </Button>
        </HStack>
      );
    } else {
      return (
        <HStack spacing={4}>
          <Button
            as={RouterLink}
            to="/signup"
            variant="ghost"
            color="gray.300"
            _hover={{ bg: 'whiteAlpha.200', color: 'white' }}
          >
            Signup
          </Button>
          <Button
            as={RouterLink}
            to="/login"
            colorScheme="blue"
          >
            Login
          </Button>
        </HStack>
      );
    }
  }

  return (
    <Box bg="gray.800" px={4} position="sticky" top={0} zIndex="sticky">
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Link
            as={RouterLink}
            to="/"
            _hover={{ textDecoration: 'none' }}
          >
            <Text
              fontSize="4xl"
              fontWeight="lighter"
              color="white"
              letterSpacing="wider"
              _hover={{ color: 'gray.300' }}
              transition="color 0.2s"
            >
              PODCAST GEAR
            </Text>
          </Link>

          <Flex alignItems="center" gap={4}>
            {showNavigation()}
            <IconButton
              aria-label="Shopping cart"
              icon={<FiShoppingCart />}
              variant="ghost"
              color="gray.300"
              fontSize="20px"
              _hover={{ bg: 'whiteAlpha.200', color: 'white' }}
              onClick={toggleCart}
            />
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}

export default Nav;
