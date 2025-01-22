import React, { useState } from 'react';
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
  Select,
  VStack,
  NumberInput,
  NumberInputField,
  Flex,
  Text,
  IconButton,
} from '@chakra-ui/react';
import { FiPlus, FiMinus } from 'react-icons/fi';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_CUSTOMERS, QUERY_INVENTORY } from '../../utils/queries';
import { CREATE_ORDER } from '../../utils/mutations';

const OrderModal = ({ isOpen, onClose }) => {
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedItems, setSelectedItems] = useState([{ itemId: '', quantity: 1 }]);
  const [paymentMethod, setPaymentMethod] = useState('');

  const { data: customersData } = useQuery(QUERY_CUSTOMERS);
  const { data: inventoryData } = useQuery(QUERY_INVENTORY);
  const [createOrder] = useMutation(CREATE_ORDER);

  const handleAddItem = () => {
    setSelectedItems([...selectedItems, { itemId: '', quantity: 1 }]);
  };

  const handleRemoveItem = (index) => {
    const newItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...selectedItems];
    newItems[index] = { ...newItems[index], [field]: value };
    setSelectedItems(newItems);
  };

  const calculateTotal = () => {
    return selectedItems.reduce((total, { itemId, quantity }) => {
      const item = inventoryData?.inventory.find(i => i._id === itemId);
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const handleSubmit = async () => {
    try {
      await createOrder({
        variables: {
          customerId: selectedCustomer,
          items: selectedItems.map(({ itemId, quantity }) => ({
            item: itemId,
            quantity: parseInt(quantity),
          })),
          paymentMethod,
        },
      });
      onClose();
      setSelectedCustomer('');
      setSelectedItems([{ itemId: '', quantity: 1 }]);
      setPaymentMethod('');
    } catch (err) {
      console.error('Error creating order:', err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Order</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>Customer</FormLabel>
              <Select
                placeholder="Select customer"
                value={selectedCustomer}
                onChange={(e) => setSelectedCustomer(e.target.value)}
              >
                {customersData?.customers.map((customer) => (
                  <option key={customer._id} value={customer._id}>
                    {customer.fullName}
                  </option>
                ))}
              </Select>
            </FormControl>

            {selectedItems.map((item, index) => (
              <Flex key={index} gap={2} align="center">
                <FormControl isRequired>
                  <FormLabel>Item {index + 1}</FormLabel>
                  <Select
                    value={item.itemId}
                    onChange={(e) => handleItemChange(index, 'itemId', e.target.value)}
                  >
                    <option value="">Select item</option>
                    {inventoryData?.inventory.map((invItem) => (
                      <option key={invItem._id} value={invItem._id}>
                        {invItem.name} - ${invItem.price}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired w="120px">
                  <FormLabel>Quantity</FormLabel>
                  <NumberInput
                    min={1}
                    value={item.quantity}
                    onChange={(value) => handleItemChange(index, 'quantity', value)}
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormControl>

                <IconButton
                  icon={<FiMinus />}
                  onClick={() => handleRemoveItem(index)}
                  aria-label="Remove item"
                  alignSelf="flex-end"
                  isDisabled={selectedItems.length === 1}
                />
              </Flex>
            ))}

            <Button leftIcon={<FiPlus />} onClick={handleAddItem} w="full">
              Add Item
            </Button>

            <FormControl isRequired>
              <FormLabel>Payment Method</FormLabel>
              <Select
                placeholder="Select payment method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="CASH">Cash</option>
                <option value="CREDIT_CARD">Credit Card</option>
                <option value="DEBIT_CARD">Debit Card</option>
                <option value="MOBILE_PAYMENT">Mobile Payment</option>
              </Select>
            </FormControl>

            <Text fontWeight="bold" alignSelf="flex-end">
              Total: ${calculateTotal().toFixed(2)}
            </Text>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isDisabled={
              !selectedCustomer ||
              !paymentMethod ||
              selectedItems.some(item => !item.itemId)
            }
          >
            Create Order
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OrderModal; 