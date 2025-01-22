import React from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  HStack,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { FiPlus, FiMoreVertical } from 'react-icons/fi';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ORDERS } from '../utils/queries';
import { UPDATE_ORDER_STATUS } from '../utils/mutations';
import OrderModal from '../components/Orders/OrderModal';

const getStatusColor = (status) => {
  const colors = {
    PENDING: 'yellow',
    PREPARING: 'blue',
    READY: 'green',
    DELIVERED: 'gray',
    CANCELLED: 'red',
  };
  return colors[status] || 'gray';
};

const Orders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, data } = useQuery(QUERY_ORDERS);
  const [updateStatus] = useMutation(UPDATE_ORDER_STATUS);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateStatus({
        variables: { id: orderId, status: newStatus },
        refetchQueries: [{ query: QUERY_ORDERS }],
      });
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Box>
      <HStack justify="space-between" mb={4}>
        <Button leftIcon={<FiPlus />} colorScheme="blue" onClick={onOpen}>
          New Order
        </Button>
      </HStack>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Order ID</Th>
            <Th>Customer</Th>
            <Th>Items</Th>
            <Th>Total</Th>
            <Th>Status</Th>
            <Th>Payment</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.orders.map((order) => (
            <Tr key={order._id}>
              <Td>{order._id.slice(-6)}</Td>
              <Td>{order.customer.fullName}</Td>
              <Td>{order.items.length} items</Td>
              <Td>${order.totalAmount}</Td>
              <Td>
                <Badge colorScheme={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
              </Td>
              <Td>
                <Badge colorScheme={order.paymentStatus === 'PAID' ? 'green' : 'yellow'}>
                  {order.paymentStatus}
                </Badge>
              </Td>
              <Td>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<FiMoreVertical />}
                    variant="ghost"
                    size="sm"
                  >
                    Actions
                  </MenuButton>
                  <MenuList>
                    <MenuItem onClick={() => handleStatusChange(order._id, 'PREPARING')}>
                      Mark as Preparing
                    </MenuItem>
                    <MenuItem onClick={() => handleStatusChange(order._id, 'READY')}>
                      Mark as Ready
                    </MenuItem>
                    <MenuItem onClick={() => handleStatusChange(order._id, 'DELIVERED')}>
                      Mark as Delivered
                    </MenuItem>
                    <MenuItem onClick={() => handleStatusChange(order._id, 'CANCELLED')}>
                      Cancel Order
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <OrderModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Orders; 