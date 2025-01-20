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
  Select,
  Badge,
} from '@chakra-ui/react';
import { GET_ORDERS } from '../graphql/queries';
import { useAuth } from '../context/AuthContext';

const statusColors = {
  PENDING: 'yellow',
  IN_PROGRESS: 'blue',
  COMPLETED: 'green',
  CANCELLED: 'red',
};

const Orders = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [statusFilter, setStatusFilter] = useState('');

  const { loading, error, data } = useQuery(GET_ORDERS, {
    variables: { 
      businessId: user?.businessId,
      status: statusFilter || undefined 
    },
  });

  if (loading) return <Spinner />;

  if (error) {
    toast({
      title: 'Error loading orders',
      description: error.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
    return null;
  }

  return (
    <Box>
      <Heading mb={6}>Order Management</Heading>

      <HStack mb={6} spacing={4}>
        <Select
          placeholder="All Statuses"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          maxW="200px"
        >
          <option value="PENDING">Pending</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </Select>
        <Button colorScheme="brand">New Order</Button>
      </HStack>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Order Number</Th>
            <Th>Customer</Th>
            <Th>Items</Th>
            <Th isNumeric>Total</Th>
            <Th>Status</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.getOrders.map((order: any) => (
            <Tr key={order._id}>
              <Td>{order.orderNumber}</Td>
              <Td>{order.customer?.name || 'N/A'}</Td>
              <Td>{order.items.length} items</Td>
              <Td isNumeric>${order.total.toFixed(2)}</Td>
              <Td>
                <Badge colorScheme={statusColors[order.status]}>
                  {order.status}
                </Badge>
              </Td>
              <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
              <Td>
                <HStack spacing={2}>
                  <Button size="sm" colorScheme="brand" variant="outline">
                    View
                  </Button>
                  <Button 
                    size="sm" 
                    colorScheme="red" 
                    variant="outline"
                    isDisabled={order.status === 'COMPLETED' || order.status === 'CANCELLED'}
                  >
                    Cancel
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

export default Orders; 