import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { ADD_CUSTOMER, UPDATE_CUSTOMER } from '../../utils/mutations';
import { QUERY_CUSTOMERS } from '../../utils/queries';

const CustomerModal = ({ isOpen, onClose, customer }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: customer || {},
  });
  const toast = useToast();

  const [addCustomer] = useMutation(ADD_CUSTOMER);
  const [updateCustomer] = useMutation(UPDATE_CUSTOMER);

  const onSubmit = async (data) => {
    try {
      if (customer) {
        await updateCustomer({
          variables: { id: customer._id, ...data },
          refetchQueries: [{ query: QUERY_CUSTOMERS }],
        });
        toast({
          title: 'Customer updated successfully.',
          status: 'success',
          duration: 3000,
        });
      } else {
        await addCustomer({
          variables: data,
          refetchQueries: [{ query: QUERY_CUSTOMERS }],
        });
        toast({
          title: 'Customer added successfully.',
          status: 'success',
          duration: 3000,
        });
      }
      onClose();
      reset();
    } catch (err) {
      toast({
        title: 'Error saving customer.',
        description: err.message,
        status: 'error',
        duration: 3000,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>
            {customer ? 'Edit Customer' : 'Add New Customer'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <SimpleGrid columns={2} spacing={4} w="full">
                <FormControl isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input {...register('firstName', { required: true })} />
                </FormControl>
                <FormControl isRequired>
                  <FormLabel>Last Name</FormLabel>
                  <Input {...register('lastName', { required: true })} />
                </FormControl>
              </SimpleGrid>

              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input 
                  type="email" 
                  {...register('email', { 
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i 
                  })} 
                />
              </FormControl>

              <FormControl>
                <FormLabel>Phone</FormLabel>
                <Input {...register('phone')} />
              </FormControl>

              <FormControl>
                <FormLabel>Street Address</FormLabel>
                <Input {...register('address.street')} />
              </FormControl>

              <SimpleGrid columns={3} spacing={4} w="full">
                <FormControl>
                  <FormLabel>City</FormLabel>
                  <Input {...register('address.city')} />
                </FormControl>
                <FormControl>
                  <FormLabel>State</FormLabel>
                  <Input {...register('address.state')} />
                </FormControl>
                <FormControl>
                  <FormLabel>ZIP Code</FormLabel>
                  <Input {...register('address.zipCode')} />
                </FormControl>
              </SimpleGrid>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit">
              {customer ? 'Update' : 'Add'} Customer
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default CustomerModal; 