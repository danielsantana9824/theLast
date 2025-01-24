import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../../utils/GlobalState';
import {
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
} from '../../utils/actions';
import { QUERY_CATEGORIES } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import {
  Box,
  Heading,
  HStack,
  Button,
  Container,
  Divider,
} from '@chakra-ui/react';

function CategoryMenu() {
  const [state, dispatch] = useStoreContext();
  const { categories } = state;
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  useEffect(() => {
    if (categoryData) {
      dispatch({
        type: UPDATE_CATEGORIES,
        categories: categoryData.categories,
      });
      categoryData.categories.forEach((category) => {
        idbPromise('categories', 'put', category);
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then((categories) => {
        dispatch({
          type: UPDATE_CATEGORIES,
          categories: categories,
        });
      });
    }
  }, [categoryData, loading, dispatch]);

  const handleClick = (id) => {
    dispatch({
      type: UPDATE_CURRENT_CATEGORY,
      currentCategory: id,
    });
  };

  return (
    <Box py={3}>
      <Container maxW="container.xl">
        <HStack spacing={4} align="center">
          <Heading size="sm" color="gray.300" mr={4}>
            Choose a Category:
          </Heading>
          <Divider orientation="vertical" h="20px" borderColor="gray.600" />
          <HStack spacing={3} overflow="auto" py={2}>
            {categories.map((item) => (
              <Button
                key={item._id}
                onClick={() => handleClick(item._id)}
                size="sm"
                variant="ghost"
                color="gray.300"
                bg="gray.800"
                _hover={{ bg: 'gray.700', color: 'white' }}
                _active={{ bg: 'gray.600' }}
              >
                {item.name}
              </Button>
            ))}
            <Button
              onClick={() => handleClick('')}
              size="sm"
              variant="ghost"
              color="gray.300"
              bg="gray.800"
              _hover={{ bg: 'gray.700', color: 'white' }}
              _active={{ bg: 'gray.600' }}
            >
              All
            </Button>
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
}

export default CategoryMenu;
