import { Box, Container, Heading, Text, VStack, FormControl, FormLabel, Input, Textarea, Button } from '@chakra-ui/react';

function Contact() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" mb={6}>
          Contact Us
        </Heading>

        <Text mb={4}>
          Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </Text>

        <Box as="form" bg="gray.800" p={6} borderRadius="lg">
          <VStack spacing={4}>
            <FormControl>
              <FormLabel color="gray.300">Name</FormLabel>
              <Input 
                type="text" 
                bg="gray.700"
                border="none"
                color="white"
                _placeholder={{ color: 'gray.400' }}
                _hover={{ bg: 'gray.600' }}
                _focus={{ bg: 'gray.600', borderColor: 'blue.300' }}
              />
            </FormControl>

            <FormControl>
              <FormLabel color="gray.300">Email</FormLabel>
              <Input 
                type="email" 
                bg="gray.700"
                border="none"
                color="white"
                _placeholder={{ color: 'gray.400' }}
                _hover={{ bg: 'gray.600' }}
                _focus={{ bg: 'gray.600', borderColor: 'blue.300' }}
              />
            </FormControl>

            <FormControl>
              <FormLabel color="gray.300">Message</FormLabel>
              <Textarea 
                bg="gray.700"
                border="none"
                color="white"
                _placeholder={{ color: 'gray.400' }}
                _hover={{ bg: 'gray.600' }}
                _focus={{ bg: 'gray.600', borderColor: 'blue.300' }}
                rows={6}
              />
            </FormControl>

            <Button colorScheme="blue" width="100%">
              Send Message
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default Contact; 