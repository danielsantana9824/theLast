import { useState } from 'react';
import { Box, Container, Heading, Text, VStack, FormControl, FormLabel, Input, Textarea, Button, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });

    // Show success message
    setShowSuccess(true);

    // Redirect to home page after 3 seconds
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  if (showSuccess) {
    return (
      <Box 
        height="calc(100vh - 64px)" 
        display="flex" 
        alignItems="center" 
        justifyContent="center"
      >
        <Alert
          status="success"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          height="200px"
          bg="gray.800"
          borderRadius="lg"
          maxWidth="500px"
        >
          <AlertIcon boxSize="40px" mr={0} color="green.300" />
          <AlertTitle mt={4} mb={1} fontSize="lg" color="white">
            Message Sent!
          </AlertTitle>
          <AlertDescription maxWidth="sm" color="gray.300">
            Thank you for contacting us, we will reply promptly
          </AlertDescription>
        </Alert>
      </Box>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Button 
        leftIcon={<FaArrowLeft />}
        mb={4}
        onClick={() => navigate('/')}
        variant="ghost"
      >
        Back to Home
      </Button>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" mb={6}>
          Contact Us
        </Heading>

        <Text mb={4}>
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </Text>

        <Box as="form" bg="gray.800" p={6} borderRadius="lg" onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel color="gray.300">Name</FormLabel>
              <Input 
                name="name"
                type="text" 
                value={formData.name}
                onChange={handleInputChange}
                bg="gray.700"
                border="none"
                color="white"
                _placeholder={{ color: 'gray.400' }}
                _hover={{ bg: 'gray.600' }}
                _focus={{ bg: 'gray.600', borderColor: 'blue.300' }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="gray.300">Email</FormLabel>
              <Input 
                name="email"
                type="email" 
                value={formData.email}
                onChange={handleInputChange}
                bg="gray.700"
                border="none"
                color="white"
                _placeholder={{ color: 'gray.400' }}
                _hover={{ bg: 'gray.600' }}
                _focus={{ bg: 'gray.600', borderColor: 'blue.300' }}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel color="gray.300">Message</FormLabel>
              <Textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                bg="gray.700"
                border="none"
                color="white"
                _placeholder={{ color: 'gray.400' }}
                _hover={{ bg: 'gray.600' }}
                _focus={{ bg: 'gray.600', borderColor: 'blue.300' }}
                rows={6}
              />
            </FormControl>

            <Button 
              type="submit" 
              colorScheme="blue" 
              width="100%"
              isDisabled={!formData.name || !formData.email || !formData.message}
            >
              Send Message
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default Contact;