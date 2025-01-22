import React, { useState } from 'react';
import {
  Box,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  IconButton,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { FiEdit2, FiTrash2, FiPlus, FiEye } from 'react-icons/fi';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_CUSTOMERS } from '../utils/queries';
import { DELETE_CUSTOMER } from '../utils/mutations';
import CustomerModal from '../components/Customers/CustomerModal';
import CustomerDetailsModal from '../components/Customers/CustomerDetailsModal';

const Customers = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [viewCustomer, setViewCustomer] = useState(null);
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isViewOpen, onOpen: onViewOpen, onClose: onViewClose } = useDisclosure();
  const { loading, data } = useQuery(QUERY_CUSTOMERS);
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER);
  const toast = useToast();

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    onEditOpen();
  };

  const handleView = (customer) => {
    setViewCustomer(customer);
    onViewOpen();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteCustomer({
          variables: { id },
          refetchQueries: [{ query: QUERY_CUSTOMERS }],
        });
        toast({
          title: 'Customer deleted.',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (err) {
        toast({
          title: 'Error deleting customer.',
          description: err.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleAdd = () => {
    setSelectedCustomer(null);
    onEditOpen();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Box>
      <HStack justify="space-between" mb={4}>
        <Button leftIcon={<FiPlus />} colorScheme="blue" onClick={handleAdd}>
          Add Customer
        </Button>
      </HStack>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Location</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.customers.map((customer) => (
            <Tr key={customer._id}>
              <Td>{`${customer.firstName} ${customer.lastName}`}</Td>
              <Td>{customer.email}</Td>
              <Td>{customer.phone}</Td>
              <Td>{customer.address?.city}, {customer.address?.state}</Td>
              <Td>
                <HStack spacing={2}>
                  <IconButton
                    icon={<FiEye />}
                    onClick={() => handleView(customer)}
                    aria-label="View details"
                    size="sm"
                  />
                  <IconButton
                    icon={<FiEdit2 />}
                    onClick={() => handleEdit(customer)}
                    aria-label="Edit"
                    size="sm"
                  />
                  <IconButton
                    icon={<FiTrash2 />}
                    onClick={() => handleDelete(customer._id)}
                    aria-label="Delete"
                    size="sm"
                    colorScheme="red"
                  />
                </HStack>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <CustomerModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        customer={selectedCustomer}
      />
      
      <CustomerDetailsModal
        isOpen={isViewOpen}
        onClose={onViewClose}
        customer={viewCustomer}
      />
    </Box>
  );
};

export default Customers; 