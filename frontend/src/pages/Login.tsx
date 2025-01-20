import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  useToast,
  Container,
} from '@chakra-ui/react';
import Auth from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { loading }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });
      Auth.login(data.login.token);
      navigate('/');
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

  return (
    <Container maxW="container.sm" py={10}>
      <VStack spacing={8}>
        <Heading>Login</Heading>
        <Box w="100%" p={8} borderWidth={1} borderRadius={8} boxShadow="lg">
          <form onSubmit={handleFormSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                isLoading={loading}
              >
                Login
              </Button>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
};

export default Login; 