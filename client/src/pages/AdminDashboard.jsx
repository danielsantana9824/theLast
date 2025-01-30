import { useState } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Select,
  NumberInput,
  NumberInputField,
  useToast,
  Image
} from '@chakra-ui/react';
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PRODUCT } from '../utils/mutations';
import { QUERY_CATEGORIES } from '../utils/queries';

function AdminDashboard() {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    image: '',
    price: '',
    quantity: '',
    category: ''
  });
  
  const [imagePreview, setImagePreview] = useState('');
  const toast = useToast();
  
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);
  const [addProduct] = useMutation(ADD_PRODUCT);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setProductData({
          ...productData,
          image: file.name
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addProduct({
        variables: {
          ...productData,
          price: parseFloat(productData.price),
          quantity: parseInt(productData.quantity)
        }
      });

      toast({
        title: 'Success',
        description: 'Product added successfully',
        status: 'success',
        duration: 3000,
        isClosable: true
      });

      setProductData({
        name: '',
        description: '',
        image: '',
        price: '',
        quantity: '',
        category: ''
      });
      setImagePreview('');
    } catch (err) {
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true
      });
    }
  };

  return (
    <Box bg="gray.900" minH="100vh" py={8}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Heading color="white">Admin Dashboard</Heading>
          
          <Box bg="gray.800" p={6} borderRadius="lg">
            <form onSubmit={handleSubmit}>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel color="gray.300">Product Name</FormLabel>
                  <Input
                    name="name"
                    value={productData.name}
                    onChange={handleInputChange}
                    bg="gray.700"
                    color="white"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="gray.300">Description</FormLabel>
                  <Textarea
                    name="description"
                    value={productData.description}
                    onChange={handleInputChange}
                    bg="gray.700"
                    color="white"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="gray.300">Category</FormLabel>
                  <Select
                    name="category"
                    value={productData.category}
                    onChange={handleInputChange}
                    bg="gray.700"
                    color="white"
                  >
                    <option value="">Select Category</option>
                    {categoryData?.categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="gray.300">Price</FormLabel>
                  <NumberInput min={0}>
                    <NumberInputField
                      name="price"
                      value={productData.price}
                      onChange={(value) => handleInputChange({ target: { name: 'price', value } })}
                      bg="gray.700"
                      color="white"
                    />
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="gray.300">Quantity</FormLabel>
                  <NumberInput min={0}>
                    <NumberInputField
                      name="quantity"
                      value={productData.quantity}
                      onChange={(value) => handleInputChange({ target: { name: 'quantity', value } })}
                      bg="gray.700"
                      color="white"
                    />
                  </NumberInput>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel color="gray.300">Image</FormLabel>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    bg="gray.700"
                    color="white"
                  />
                  {imagePreview && (
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      maxH="200px"
                      mt={2}
                    />
                  )}
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  w="100%"
                >
                  Add Product
                </Button>
              </VStack>
            </form>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

export default AdminDashboard; 