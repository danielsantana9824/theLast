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
  useDisclosure,
  Badge,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_INVENTORY } from '../utils/queries';
import { DELETE_INVENTORY_ITEM } from '../utils/mutations';
import InventoryModal from '../components/Inventory/InventoryModal';

const Inventory = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { loading, data } = useQuery(QUERY_INVENTORY);
  const [deleteItem] = useMutation(DELETE_INVENTORY_ITEM);

  const handleEdit = (item) => {
    setSelectedItem(item);
    onOpen();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await deleteItem({
          variables: { id },
          refetchQueries: [{ query: QUERY_INVENTORY }],
        });
      } catch (err) {
        console.error('Error deleting item:', err);
      }
    }
  };

  const handleAdd = () => {
    setSelectedItem(null);
    onOpen();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Box>
      <HStack justify="space-between" mb={4}>
        <Button leftIcon={<FiPlus />} colorScheme="blue" onClick={handleAdd}>
          Add Item
        </Button>
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
          {data?.inventory.map((item) => (
            <Tr key={item._id}>
              <Td>{item.name}</Td>
              <Td>{item.category}</Td>
              <Td isNumeric>{item.quantity}</Td>
              <Td isNumeric>${item.price}</Td>
              <Td>
                <Badge colorScheme={item.isLowStock ? 'red' : 'green'}>
                  {item.isLowStock ? 'Low Stock' : 'In Stock'}
                </Badge>
              </Td>
              <Td>
                <HStack spacing={2}>
                  <IconButton
                    icon={<FiEdit2 />}
                    onClick={() => handleEdit(item)}
                    aria-label="Edit"
                    size="sm"
                  />
                  <IconButton
                    icon={<FiTrash2 />}
                    onClick={() => handleDelete(item._id)}
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

      <InventoryModal
        isOpen={isOpen}
        onClose={onClose}
        item={selectedItem}
      />
    </Box>
  );
};

export default Inventory; 