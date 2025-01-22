import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        role
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $role: String) {
    addUser(username: $username, email: $email, password: $password, role: $role) {
      token
      user {
        _id
        username
        email
        role
      }
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation createOrder($customerId: ID!, $items: [OrderItemInput!]!, $paymentMethod: String!, $notes: String) {
    createOrder(customerId: $customerId, items: $items, paymentMethod: $paymentMethod, notes: $notes) {
      _id
      customer {
        fullName
      }
      items {
        item {
          name
          price
        }
        quantity
      }
      status
      totalAmount
      paymentStatus
      paymentMethod
      createdAt
    }
  }
`;

export const UPDATE_ORDER_STATUS = gql`
  mutation updateOrderStatus($id: ID!, $status: String!) {
    updateOrderStatus(id: $id, status: $status) {
      _id
      status
      updatedAt
    }
  }
`;

export const ADD_CUSTOMER = gql`
  mutation addCustomer(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String
    $address: AddressInput
  ) {
    addCustomer(
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone
      address: $address
    ) {
      _id
      firstName
      lastName
      email
      phone
      address {
        street
        city
        state
        zipCode
      }
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation updateCustomer(
    $id: ID!
    $firstName: String
    $lastName: String
    $email: String
    $phone: String
    $address: AddressInput
  ) {
    updateCustomer(
      id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone
      address: $address
    ) {
      _id
      firstName
      lastName
      email
      phone
      address {
        street
        city
        state
        zipCode
      }
    }
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation deleteCustomer($id: ID!) {
    deleteCustomer(id: $id) {
      _id
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation deleteOrder($id: ID!) {
    deleteOrder(id: $id) {
      _id
    }
  }
`;

export const UPDATE_PAYMENT_STATUS = gql`
  mutation updatePaymentStatus($id: ID!, $status: String!) {
    updatePaymentStatus(id: $id, status: $status) {
      _id
      paymentStatus
    }
  }
`;

export const ADD_INVENTORY_ITEM = gql`
  mutation addInventoryItem($name: String!, $category: String!, $quantity: Int!, $price: Float!, $minStockLevel: Int!) {
    addInventoryItem(name: $name, category: $category, quantity: $quantity, price: $price, minStockLevel: $minStockLevel) {
      _id
      name
      category
      quantity
      price
      minStockLevel
      isLowStock
    }
  }
`;

export const UPDATE_INVENTORY_ITEM = gql`
  mutation updateInventoryItem($id: ID!, $name: String, $category: String, $quantity: Int, $price: Float, $minStockLevel: Int) {
    updateInventoryItem(id: $id, name: $name, category: $category, quantity: $quantity, price: $price, minStockLevel: $minStockLevel) {
      _id
      name
      category
      quantity
      price
      minStockLevel
      isLowStock
    }
  }
`;

export const DELETE_INVENTORY_ITEM = gql`
  mutation deleteInventoryItem($id: ID!) {
    deleteInventoryItem(id: $id) {
      _id
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation logout {
    logout
  }
`;