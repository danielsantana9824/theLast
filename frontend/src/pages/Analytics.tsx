import { useState } from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  Heading,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Spinner,
  useToast,
  HStack,
  Input,
} from '@chakra-ui/react';
import { GET_ANALYTICS } from '../graphql/queries';
import { useAuth } from '../context/AuthContext';

const Analytics = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0];
  });
  const [endDate, setEndDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  const { loading, error, data } = useQuery(GET_ANALYTICS, {
    variables: {
      businessId: user?.businessId,
      startDate,
      endDate: new Date(endDate + 'T23:59:59').toISOString(),
    },
  });

  if (loading) return <Spinner />;

  if (error) {
    toast({
      title: 'Error loading analytics',
      description: error.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
    return null;
  }

  const { totalOrders, totalRevenue, averageOrderValue, topProducts } = data.getAnalytics;

  return (
    <Box>
      <Heading mb={6}>Analytics Dashboard</Heading>

      <HStack mb={6} spacing={4}>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          max={endDate}
        />
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          min={startDate}
        />
      </HStack>

      <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={8}>
        <Stat p={4} bg="white" borderRadius="lg" shadow="sm">
          <StatLabel>Total Orders</StatLabel>
          <StatNumber>{totalOrders}</StatNumber>
          <StatHelpText>Selected Period</StatHelpText>
        </Stat>

        <Stat p={4} bg="white" borderRadius="lg" shadow="sm">
          <StatLabel>Total Revenue</StatLabel>
          <StatNumber>${totalRevenue.toFixed(2)}</StatNumber>
          <StatHelpText>Selected Period</StatHelpText>
        </Stat>

        <Stat p={4} bg="white" borderRadius="lg" shadow="sm">
          <StatLabel>Average Order Value</StatLabel>
          <StatNumber>${averageOrderValue.toFixed(2)}</StatNumber>
          <StatHelpText>Selected Period</StatHelpText>
        </Stat>
      </Grid>

      <Box bg="white" p={6} borderRadius="lg" shadow="sm">
        <Heading size="md" mb={4}>Top Products</Heading>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Product</Th>
              <Th isNumeric>Units Sold</Th>
              <Th isNumeric>Revenue</Th>
            </Tr>
          </Thead>
          <Tbody>
            {topProducts.map((product: any) => (
              <Tr key={product.item._id}>
                <Td>{product.item.name}</Td>
                <Td isNumeric>{product.count}</Td>
                <Td isNumeric>${product.revenue.toFixed(2)}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Analytics; 