import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import { ADMIN_SIGNUP } from '../utils/mutations';
import Auth from '../utils/auth';

function AdminSignup() {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    adminCode: '' // Special code for admin registration
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [adminSignup] = useMutation(ADMIN_SIGNUP);
  const toast = useToast();
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // Verify admin code (you should implement this validation)
      if (formState.adminCode !== 'YOUR_ADMIN_CODE') {
        throw new Error('Invalid admin code');
      }

      const mutationResponse = await adminSignup({
        variables: {
          email: formState.email,
          password: formState.password,
          firstName: formState.firstName,
          lastName: formState.lastName,
        },
      });
      
      const token = mutationResponse.data.adminSignup.token;
      Auth.login(token);
      navigate('/admin-dashboard');
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
              <Heading color="white">Create Admin Account</Heading>
              <Text color="gray.400">Enter your details to create an admin account</Text>
            </VStack>

            <form onSubmit={handleFormSubmit} style={{ width: '100%' }}>
              <VStack spacing={4}>
                {/* Existing form fields similar to Signup.jsx */}
                <FormControl isRequired>
                  <FormLabel color="gray.300">Admin Code</FormLabel>
                  <Input
                    name="adminCode"
                    type="password"
                    placeholder="Enter admin code"
                    onChange={handleChange}
                    bg="gray.700"
                    border="none"
                    color="white"
                    _placeholder={{ color: 'gray.400' }}
                    _hover={{ bg: 'gray.600' }}
                    _focus={{ bg: 'gray.600', borderColor: 'blue.300' }}
                  />
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="red"
                  size="lg"
                  fontSize="md"
                  w="100%"
                  mt={4}
                >
                  Create Admin Account
                </Button>
              </VStack>
            </form>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}

export default AdminSignup; 