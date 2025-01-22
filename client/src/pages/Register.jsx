import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Text,
  Link,
  useToast,
  Container,
  Select,
} from '@chakra-ui/react';
import { ADD_USER } from '../utils/mutations';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
    role: 'EMPLOYEE'
  });
  const [register, { loading }] = useMutation(ADD_USER);
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Submitting form with data:', formState);
      const { data } = await register({
        variables: { 
          username: formState.username,
          email: formState.email,
          password: formState.password,
          role: formState.role
        },
      });
      console.log('Response data:', data);
      await handleLogin(formState.email, formState.password);
      navigate('/');
    } catch (err) {
      console.error('Full error:', err);
      toast({
        title: 'Error registering',
        description: err.message || 'An unexpected error occurred',
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
    <Container maxW="container.sm" py={10}>
      <Box bg="white" p={8} rounded="lg" shadow="base">
        <VStack spacing={4}>
          <Text fontSize="2xl" fontWeight="bold">
            Register
          </Text>
          <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="text"
                  name="username"
                  value={formState.username}
                  onChange={handleChange}
                  placeholder="Enter your username"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Role</FormLabel>
                <Select
                  name="role"
                  value={formState.role}
                  onChange={handleChange}
                >
                  <option value="EMPLOYEE">Employee</option>
                  <option value="ADMIN">Admin</option>
                </Select>
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                width="100%"
                isLoading={loading}
              >
                Register
              </Button>
            </VStack>
          </form>
          <Text>
            Already have an account?{' '}
            <Link as={RouterLink} to="/login" color="blue.500">
              Login here
            </Link>
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default Register;
