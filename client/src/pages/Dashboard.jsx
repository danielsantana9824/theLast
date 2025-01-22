import React from 'react';
import {
  Box,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { QUERY_RECENT_ORDERS, QUERY_LOW_STOCK } from '../utils/queries';

const StatCard = ({ label, value, helpText }) => (
  <Card>
    <CardBody>
      <Stat>
        <StatLabel>{label}</StatLabel>
        <StatNumber>{value}</StatNumber>
        <StatHelpText>{helpText}</StatHelpText>
      </Stat>
    </CardBody>
  </Card>
);

const Dashboard = () => {
  const { data: ordersData } = useQuery(QUERY_RECENT_ORDERS);
  const { data: stockData } = useQuery(QUERY_LOW_STOCK);

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={4} mb={8}>
        <StatCard
          label="Total Orders"
          value="150"
          helpText="Last 30 days"
        />
        <StatCard
          label="Revenue"
          value="$12,450"
          helpText="Last 30 days"
        />
        <StatCard
          label="Active Customers"
          value="45"
          helpText="Currently active"
        />
        <StatCard
          label="Low Stock Items"
          value={stockData?.lowStockItems?.length || '0'}
          helpText="Needs attention"
        />
      </SimpleGrid>

      <Grid templateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={8}>
        <Card>
          <CardHeader>
            <Heading size="md">Recent Orders</Heading>
          </CardHeader>
          <CardBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Order ID</Th>
                  <Th>Customer</Th>
                  <Th>Status</Th>
                  <Th isNumeric>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                {ordersData?.recentOrders?.map((order) => (
                  <Tr key={order._id}>
                    <Td>{order._id}</Td>
                    <Td>{order.customer.fullName}</Td>
                    <Td>{order.status}</Td>
                    <Td isNumeric>${order.totalAmount}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Low Stock Alert</Heading>
          </CardHeader>
          <CardBody>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Item</Th>
                  <Th isNumeric>Quantity</Th>
                </Tr>
              </Thead>
              <Tbody>
                {stockData?.lowStockItems?.map((item) => (
                  <Tr key={item._id}>
                    <Td>{item.name}</Td>
                    <Td isNumeric>{item.quantity}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </CardBody>
        </Card>
      </Grid>
    </Box>
  );
};

export default Dashboard; 