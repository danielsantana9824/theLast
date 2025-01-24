import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Link,
  Heading,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [login, { error }] = useMutation(LOGIN);
  const toast = useToast();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      toast({
        title: 'Error',
        description: 'Invalid credentials',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Box bg="gray.900" minH="100vh" py={20}>
      <Container maxW="lg">
        <Box
          bg="gray.800"
          p={8}
          borderRadius="xl"
          boxShadow="2xl"
          border="1px"
          borderColor="gray.700"
        >
          <VStack spacing={8}>
            <VStack spacing={2} textAlign="center">
              <Heading color="white">Welcome Back</Heading>
              <Text color="gray.400">Enter your credentials to access your account</Text>
            </VStack>

            <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
              <VStack spacing={4} w="100%">
                <FormControl>
                  <FormLabel color="gray.300">Email Address</FormLabel>
                  <Input
                    name="email"
                    type="email"
                    placeholder="your@email.com"
                    onChange={handleChange}
                    bg="gray.700"
                    border="none"
                    color="white"
                    _placeholder={{ color: 'gray.400' }}
                    _hover={{ bg: 'gray.600' }}
                    _focus={{ bg: 'gray.600', borderColor: 'blue.300' }}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel color="gray.300">Password</FormLabel>
                  <InputGroup>
                    <Input
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      onChange={handleChange}
                      bg="gray.700"
                      border="none"
                      color="white"
                      _placeholder={{ color: 'gray.400' }}
                      _hover={{ bg: 'gray.600' }}
                      _focus={{ bg: 'gray.600', borderColor: 'blue.300' }}
                    />
                    <InputRightElement>
                      <IconButton
                        icon={showPassword ? <FiEyeOff /> : <FiEye />}
                        variant="ghost"
                        color="gray.400"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                        _hover={{ bg: 'transparent', color: 'white' }}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  fontSize="md"
                  w="100%"
                  mt={4}
                >
                  Sign In
                </Button>
              </VStack>
            </form>

            <Text color="gray.400">
              Don't have an account?{' '}
              <Link
                as={RouterLink}
                to="/signup"
                color="blue.400"
                _hover={{ color: 'blue.300' }}
              >
                Sign up
              </Link>
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;
