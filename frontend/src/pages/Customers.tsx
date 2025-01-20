import { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Spinner,
  useToast,
  HStack,
  Input,
  Text,
} from '@chakra-ui/react';
import { GET_CUSTOMERS } from '../graphql/queries';
import { useAuth } from '../context/AuthContext';

const Customers = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const { loading, error, data } = useQuery(GET_CUSTOMERS, {
    variables: { businessId: user?.businessId },
  });

  if (loading) return <Spinner />;

  if (error) {
    toast({
      title: 'Error loading customers',
      description: error.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
    return null;
  }

  const filteredCustomers = data.getCustomers.filter((customer: any) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone?.includes(searchTerm)
  );

  return (
    <Box>
      <Heading mb={6}>Customer Management</Heading>

      <HStack mb={6} spacing={4}>
        <Input
          placeholder="Search customers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          maxW="300px"
        />
        <Button colorScheme="brand">Add Customer</Button>
      </HStack>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Location</Th>
            <Th>Orders</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredCustomers.map((customer: any) => (
            <Tr key={customer._id}>
              <Td>{customer.name}</Td>
              <Td>{customer.email || '-'}</Td>
              <Td>{customer.phone || '-'}</Td>
              <Td>
                {customer.address ? (
                  `${customer.address.city}, ${customer.address.state}`
                ) : (
                  '-'
                )}
              </Td>
              <Td>
                <Text color="brand.600">
                  {customer.orders?.length || 0} orders
                </Text>
              </Td>
              <Td>
                <HStack spacing={2}>
                  <Button size="sm" colorScheme="brand" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm" colorScheme="brand" variant="outline">
                    View Orders
                  </Button>
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Customers; 