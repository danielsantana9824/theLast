import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { client } from './utils/apolloClient';
import { theme } from './theme';
import AppRoutes from './routes';

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Router>
          <AppRoutes />
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App; 