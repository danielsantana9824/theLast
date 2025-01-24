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
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

function Signup() {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [addUser] = useMutation(ADD_USER);
  const toast = useToast();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await addUser({
        variables: {
          email: formState.email,
          password: formState.password,
          firstName: formState.firstName,
          lastName: formState.lastName,
        },
      });
      const token = mutationResponse.data.addUser.token;
      Auth.login(token);
    } catch (e) {
      toast({
        title: 'Error',
        description: e.message,
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
              <Heading color="white">Create Account</Heading>
              <Text color="gray.400">Enter your details to get started</Text>
            </VStack>

            <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
              <VStack spacing={4} w="100%">
                <FormControl>
                  <FormLabel color="gray.300">First Name</FormLabel>
                  <Input
                    name="firstName"
                    type="text"
                    placeholder="Enter your first name"
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
                  <FormLabel color="gray.300">Last Name</FormLabel>
                  <Input
                    name="lastName"
                    type="text"
                    placeholder="Enter your last name"
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
                  Create Account
                </Button>
              </VStack>
            </form>

            <Text color="gray.400">
              Already have an account?{' '}
              <Link
                as={RouterLink}
                to="/login"
                color="blue.400"
                _hover={{ color: 'blue.300' }}
              >
                Sign in
              </Link>
            </Text>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

export default Signup;
