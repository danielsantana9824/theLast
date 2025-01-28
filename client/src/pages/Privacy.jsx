import { Box, Container, Heading, Text, VStack, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function Privacy() {
  const navigate = useNavigate();

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
          Privacy Policy
        </Heading>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Information We Collect
          </Heading>
          <Text mb={4}>
            We collect information you provide directly to us, including name, email address, 
            shipping address, and payment information when placing an order.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            How We Use Your Information
          </Heading>
          <Text mb={4}>
            We use the information we collect to:
            - Process your orders
            - Send order confirmations
            - Provide customer support
            - Send product updates and marketing communications (with your consent)
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Data Security
          </Heading>
          <Text mb={4}>
            We implement security measures to protect your personal information. 
            All payment transactions are encrypted using SSL technology.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Cookies
          </Heading>
          <Text mb={4}>
            We use cookies to enhance your shopping experience and analyze site traffic.
          </Text>
        </Box>

        <Text color="gray.600" fontSize="sm">
          Last updated: {new Date().toLocaleDateString()}
        </Text>
      </VStack>
    </Container>
  );
}

export default Privacy;