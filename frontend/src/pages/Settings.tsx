import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  Spinner,
  useToast,
  Divider,
  Text,
  Switch,
  HStack,
} from '@chakra-ui/react';
import { GET_BUSINESS_CONFIG } from '../graphql/queries';
import { UPDATE_BUSINESS_CONFIG } from '../graphql/mutations';
import { useAuth } from '../context/AuthContext';

const Settings = () => {
  const { user } = useAuth();
  const toast = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    businessType: '',
    features: [] as string[],
  });

  const { loading, error, data } = useQuery(GET_BUSINESS_CONFIG, {
    variables: { businessId: user?.businessId },
    onCompleted: (data) => {
      setFormData({
        name: data.getBusinessConfig.name,
        businessType: data.getBusinessConfig.businessType,
        features: data.getBusinessConfig.features,
      });
    },
  });

  const [updateConfig, { loading: updating }] = useMutation(UPDATE_BUSINESS_CONFIG, {
    onCompleted: () => {
      toast({
        title: 'Settings updated',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setIsEditing(false);
    },
    onError: (error) => {
      toast({
        title: 'Error updating settings',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    },
  });

  if (loading) return <Spinner />;

  if (error) {
    toast({
      title: 'Error loading settings',
      description: error.message,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateConfig({
      variables: {
        businessId: user?.businessId,
        ...formData,
      },
    });
  };

  const toggleFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature],
    }));
  };

  const availableFeatures = ['INVENTORY', 'ORDERS', 'CUSTOMERS', 'ANALYTICS', 'TABLES', 'APPOINTMENTS'];
  const businessTypes = ['RESTAURANT', 'RETAIL', 'SERVICE', 'OTHER'];

  return (
    <Box>
      <Heading mb={6}>Business Settings</Heading>

      <form onSubmit={handleSubmit}>
        <VStack spacing={6} align="stretch">
          <FormControl>
            <FormLabel>Business Name</FormLabel>
            <Input
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              isDisabled={!isEditing}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Business Type</FormLabel>
            <Select
              value={formData.businessType}
              onChange={(e) => setFormData(prev => ({ ...prev, businessType: e.target.value }))}
              isDisabled={!isEditing}
            >
              {businessTypes.map(type => (
                <option key={type} value={type}>
                  {type.charAt(0) + type.slice(1).toLowerCase()}
                </option>
              ))}
            </Select>
          </FormControl>

          <Divider />

          <Text fontSize="lg" fontWeight="medium">Features</Text>
          <VStack align="stretch" spacing={4}>
            {availableFeatures.map(feature => (
              <FormControl key={feature} display="flex" alignItems="center">
                <FormLabel mb={0}>{feature.charAt(0) + feature.slice(1).toLowerCase()}</FormLabel>
                <Switch
                  isChecked={formData.features.includes(feature)}
                  onChange={() => toggleFeature(feature)}
                  isDisabled={!isEditing}
                />
              </FormControl>
            ))}
          </VStack>

          <HStack spacing={4}>
            {!isEditing ? (
              <Button colorScheme="brand" onClick={() => setIsEditing(true)}>
                Edit Settings
              </Button>
            ) : (
              <>
                <Button type="submit" colorScheme="brand" isLoading={updating}>
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </>
            )}
          </HStack>
        </VStack>
      </form>
    </Box>
  );
};

export default Settings; 