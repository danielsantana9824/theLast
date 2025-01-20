import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        role
        businessId
      }
    }
  }
`;

export const UPDATE_BUSINESS_CONFIG = gql`
  mutation UpdateBusinessConfig($businessId: ID!, $name: String, $features: [String]) {
    updateBusinessConfig(businessId: $businessId, name: $name, features: $features) {
      _id
      name
      features
    }
  }
`;

export const ADD_INVENTORY_ITEM = gql`
  mutation AddInventoryItem(
    $businessId: ID!
    $name: String!
    $description: String
    $category: String!
    $quantity: Int!
    $price: Float
    $unit: String
  ) {
    addInventoryItem(
      businessId: $businessId
      name: $name
      description: $description
      category: $category
      quantity: $quantity
      price: $price
      unit: $unit
    ) {
      _id
      name
      quantity
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrder(
    $businessId: ID!
    $customerId: ID!
    $items: [OrderItemInput]!
    $notes: String
  ) {
    createOrder(
      businessId: $businessId
      customerId: $customerId
      items: $items
      notes: $notes
    ) {
      _id
      orderNumber
      total
    }
  }
`;

export const ADD_CUSTOMER = gql`
  mutation AddCustomer(
    $businessId: ID!
    $name: String!
    $email: String
    $phone: String
    $address: AddressInput
  ) {
    addCustomer(
      businessId: $businessId
      name: $name
      email: $email
      phone: $phone
      address: $address
    ) {
      _id
      name
    }
  }
`; 