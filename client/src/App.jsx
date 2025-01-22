import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './styles/global.css';

// Import pages
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import Customers from './pages/Customers';

// Import components
import PrivateRoute from './components/Auth/PrivateRoute';
import Layout from './components/Layout/Layout';

// Create Apollo Client
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Auth link middleware
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <CSSReset />
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route element={<Layout />}>
              <Route 
                path="/" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/inventory" 
                element={
                  <PrivateRoute>
                    <Inventory />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/orders" 
                element={
                  <PrivateRoute>
                    <Orders />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/customers" 
                element={
                  <PrivateRoute>
                    <Customers />
                  </PrivateRoute>
                } 
              />
            </Route>
          </Routes>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App; 