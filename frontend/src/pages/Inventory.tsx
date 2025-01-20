import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
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
  useDisclosure,
  Spinner,
  useToast,
  HStack,
  Input,
  Select,
} from '@chakra-ui/react';
import { GET_INVENTORY } from '../graphql/queries';
import { useAuth } from '../context/AuthContext';

const Inventory = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const { loading, error, data } = useQuery(GET_INVENTORY, {
    variables: { businessId: user?.businessId },
  });

  if (loading) return <Spinner />;

  if (error) {
    toast({
      title: 'Error loading inventory',
      description: error.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
    return null;
  }

  const filteredItems = data.getInventory.filter((item: any) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !categoryFilter || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(data.getInventory.map((item: any) => item.category))];

  return (
    <Box>
      <Heading mb={6}>Inventory Management</Heading>

      <HStack mb={6} spacing={4}>
        <Input
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          maxW="300px"
        />
        <Select
          placeholder="All Categories"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          maxW="200px"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </Select>
        <Button colorScheme="brand">Add Item</Button>
      </HStack>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Category</Th>
            <Th isNumeric>Quantity</Th>
            <Th isNumeric>Price</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredItems.map((item: any) => (
            <Tr key={item._id}>
              <Td>{item.name}</Td>
              <Td>{item.category}</Td>
              <Td isNumeric>{item.quantity}</Td>
              <Td isNumeric>${item.price?.toFixed(2)}</Td>
              <Td>{item.isActive ? 'Active' : 'Inactive'}</Td>
              <Td>
                <HStack spacing={2}>
                  <Button size="sm" colorScheme="brand" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm" colorScheme="red" variant="outline">
                    Delete
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

export default Inventory; 