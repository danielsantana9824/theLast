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
  const { data, loading, error } = useQuery(QUERY_CUSTOMERS);
  const [deleteCustomer] = useMutation(DELETE_CUSTOMER);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const toast = useToast();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading customers</div>;

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    onOpen();
  };

  const handleDelete = async (id) => {
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
  };

  const handleViewDetails = (customer) => {
    setSelectedCustomer(customer);
    setIsDetailsOpen(true);
  };

  return (
    <Box>
      <HStack justify="space-between" mb={4}>
        <Button leftIcon={<FiPlus />} colorScheme="blue" onClick={() => {
          setSelectedCustomer(null);
          onOpen();
        }}>
          Add Customer
        </Button>
      </HStack>

      <CustomerModal
        isOpen={isOpen}
        onClose={onClose}
        customer={selectedCustomer}
      />

      <CustomerDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        customer={selectedCustomer}
      />

      <Box overflowX="auto">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Phone</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.customers.map((customer) => (
              <Tr key={customer.id}>
                <Td>{customer.name}</Td>
                <Td>{customer.email}</Td>
                <Td>{customer.phone}</Td>
                <Td>
                  <HStack spacing={2}>
                    <IconButton
                      icon={<FiEye />}
                      aria-label="View details"
                      onClick={() => handleViewDetails(customer)}
                    />
                    <IconButton
                      icon={<FiEdit2 />}
                      aria-label="Edit customer"
                      onClick={() => handleEdit(customer)}
                    />
                    <IconButton
                      icon={<FiTrash2 />}
                      aria-label="Delete customer"
                      onClick={() => handleDelete(customer.id)}
                    />
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Customers; 