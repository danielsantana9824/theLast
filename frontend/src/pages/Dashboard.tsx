import { useQuery } from '@apollo/client';
import {
  Box,
  Grid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Heading,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { GET_ANALYTICS } from '../graphql/queries';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();
  const toast = useToast();
  
  // Get last 30 days analytics
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  
  const { loading, error, data } = useQuery(GET_ANALYTICS, {
    variables: {
      businessId: user?.businessId,
      startDate: startDate.toISOString(),
      endDate: new Date().toISOString(),
    },
  });

  if (loading) return <Spinner />;
  
  if (error) {
    toast({
      title: 'Error loading dashboard',
      description: error.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
    return null;
  }

  const { totalOrders, totalRevenue, averageOrderValue } = data.getAnalytics;

  return (
    <Box>
      <Heading mb={6}>Dashboard</Heading>
      
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <Stat p={4} bg="white" borderRadius="lg" shadow="sm">
          <StatLabel>Total Orders</StatLabel>
          <StatNumber>{totalOrders}</StatNumber>
          <StatHelpText>Last 30 days</StatHelpText>
        </Stat>
        
        <Stat p={4} bg="white" borderRadius="lg" shadow="sm">
          <StatLabel>Total Revenue</StatLabel>
          <StatNumber>${totalRevenue.toFixed(2)}</StatNumber>
          <StatHelpText>Last 30 days</StatHelpText>
        </Stat>
        
        <Stat p={4} bg="white" borderRadius="lg" shadow="sm">
          <StatLabel>Average Order Value</StatLabel>
          <StatNumber>${averageOrderValue.toFixed(2)}</StatNumber>
          <StatHelpText>Last 30 days</StatHelpText>
        </Stat>
      </Grid>
    </Box>
  );
};

export default Dashboard; 