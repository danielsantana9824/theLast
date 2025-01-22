import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  VStack,
  HStack,
  Divider,
  Badge,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { QUERY_CUSTOMER_ORDERS } from '../../utils/queries';

const CustomerDetailsModal = ({ isOpen, onClose, customer }) => {
  const { data: orderData } = useQuery(QUERY_CUSTOMER_ORDERS, {
    variables: { customerId: customer?._id },
    skip: !customer,
  });

  if (!customer) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Customer Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack align="stretch" spacing={4} pb={4}>
            <HStack justify="space-between">
              <Text fontWeight="bold">Name:</Text>
              <Text>{customer.firstName} {customer.lastName}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontWeight="bold">Email:</Text>
              <Text>{customer.email}</Text>
            </HStack>
            <HStack justify="space-between">
              <Text fontWeight="bold">Phone:</Text>
              <Text>{customer.phone || 'N/A'}</Text>
            </HStack>
            
            <Divider />
            
            <Text fontWeight="bold">Address:</Text>
            {customer.address && (
              <VStack align="stretch" pl={4}>
                <Text>{customer.address.street}</Text>
                <Text>
                  {customer.address.city}, {customer.address.state} {customer.address.zipCode}
                </Text>
              </VStack>
            )}
            
            <Divider />
            
            <Text fontWeight="bold">Recent Orders:</Text>
            {orderData?.customerOrders?.map((order) => (
              <HStack key={order._id} justify="space-between">
                <Text>Order #{order._id.slice(-6)}</Text>
                <Badge colorScheme={order.status === 'DELIVERED' ? 'green' : 'yellow'}>
                  {order.status}
                </Badge>
                <Text>${order.totalAmount}</Text>
              </HStack>
            ))}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CustomerDetailsModal; 