import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';

const Profile = () => {
  const { loading, error, data } = useQuery(QUERY_ME);

  if (loading) {
    return (
      <Container centerContent py={10}>
        <Spinner size="xl" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container py={10}>
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Error loading profile</AlertTitle>
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      </Container>
    );
  }

  const user = data?.me;

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={6} align="stretch">
        <Heading>Profile</Heading>
        <Box p={6} borderWidth={1} borderRadius="lg">
          <VStack spacing={4} align="stretch">
            <Text><strong>Username:</strong> {user?.username}</Text>
            <Text><strong>Email:</strong> {user?.email}</Text>
            <Text><strong>Role:</strong> {user?.role}</Text>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Profile;