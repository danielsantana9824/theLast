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
  NumberInput,
  NumberInputField,
  Select,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation } from '@apollo/client';
import { ADD_INVENTORY_ITEM, UPDATE_INVENTORY_ITEM } from '../../utils/mutations';
import { QUERY_INVENTORY } from '../../utils/queries';

const InventoryModal = ({ isOpen, onClose, item }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: item || {},
  });

  const [addItem] = useMutation(ADD_INVENTORY_ITEM);
  const [updateItem] = useMutation(UPDATE_INVENTORY_ITEM);

  const onSubmit = async (data) => {
    try {
      if (item) {
        await updateItem({
          variables: { id: item._id, ...data },
          refetchQueries: [{ query: QUERY_INVENTORY }],
        });
      } else {
        await addItem({
          variables: data,
          refetchQueries: [{ query: QUERY_INVENTORY }],
        });
      }
      onClose();
      reset();
    } catch (err) {
      console.error('Error saving item:', err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>{item ? 'Edit Item' : 'Add New Item'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input {...register('name')} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Category</FormLabel>
                <Select {...register('category')}>
                  <option value="FOOD">Food</option>
                  <option value="BEVERAGE">Beverage</option>
                  <option value="SUPPLIES">Supplies</option>
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Quantity</FormLabel>
                <NumberInput min={0}>
                  <NumberInputField {...register('quantity')} />
                </NumberInput>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Price</FormLabel>
                <NumberInput min={0} precision={2}>
                  <NumberInputField {...register('price')} />
                </NumberInput>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Minimum Stock Level</FormLabel>
                <NumberInput min={0}>
                  <NumberInputField {...register('minStockLevel')} />
                </NumberInput>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit">
              Save
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default InventoryModal; 