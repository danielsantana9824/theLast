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
    <div className="category-container">
      <h2 color='white'>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          className={state.currentCategory === item._id ? 'category-btn active' : 'category-btn'}
          onClick={() => handleClick(item._id)}
        >
          {item.name}
        </button>
      ))}
      <button
        className={state.currentCategory === '' ? 'category-btn active' : 'category-btn'}
        onClick={() => handleClick('')}
      >
        All
      </button>
    </div>
  );
}

export default CategoryMenu;
