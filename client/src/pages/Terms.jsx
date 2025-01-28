import { Box, Container, Heading, Text, VStack, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

function Terms() {
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
          Terms of Service
        </Heading>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Agreement to Terms
          </Heading>
          <Text mb={4}>
            By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Use License
          </Heading>
          <Text mb={4}>
            Permission is granted to temporarily download one copy of the materials for personal, non-commercial transitory viewing only.
          </Text>
        </Box>

        <Box>
          <Heading as="h2" size="lg" mb={4}>
            Disclaimer
          </Heading>
          <Text mb={4}>
            The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability.
          </Text>
        </Box>

        <Text color="gray.600" fontSize="sm">
          Last updated: {new Date().toLocaleDateString()}
        </Text>
      </VStack>
    </Container>
  );
}

export default Terms;