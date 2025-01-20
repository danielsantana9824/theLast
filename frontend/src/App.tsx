import React from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import client from './utils/apolloClient';

// Components
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Analytics from './pages/Analytics';

function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Router>
          <Box minH="100vh">
            <Navbar />
            <Box p={4}>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } />
                <Route path="/inventory" element={
                  <PrivateRoute>
                    <Inventory />
                  </PrivateRoute>
                } />
                <Route path="/orders" element={
                  <PrivateRoute>
                    <Orders />
                  </PrivateRoute>
                } />
                <Route path="/customers" element={
                  <PrivateRoute>
                    <Customers />
                  </PrivateRoute>
                } />
                <Route path="/analytics" element={
                  <PrivateRoute>
                    <Analytics />
                  </PrivateRoute>
                } />
              </Routes>
            </Box>
          </Box>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App; 