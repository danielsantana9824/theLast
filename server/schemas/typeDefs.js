const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    role: String!
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Inventory {
    _id: ID!
    name: String!
    description: String
    quantity: Float!
    unit: String!
    price: Float!
    category: String!
    minStockLevel: Float!
    lastUpdated: String!
    updatedBy: User!
    isLowStock: Boolean!
  }

  type Customer {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phone: String
    address: Address
    preferences: [KeyValue]
    createdAt: String!
    lastVisit: String!
    fullName: String!
  }

  type Address {
    street: String
    city: String
    state: String
    zipCode: String
  }

  type KeyValue {
    key: String!
    value: String!
  }

  type OrderItem {
    item: Inventory!
    quantity: Int!
    price: Float!
    notes: String
  }

  type Order {
    _id: ID!
    customer: Customer!
    items: [OrderItem!]!
    status: String!
    totalAmount: Float!
    paymentStatus: String!
    paymentMethod: String!
    createdAt: String!
    updatedAt: String!
    createdBy: User!
    notes: String
  }

  input AddressInput {
    street: String
    city: String
    state: String
    zipCode: String
  }

  input OrderItemInput {
    itemId: ID!
    quantity: Int!
    notes: String
  }

  type Query {
    me: User
    users: [User]
    user(userId: ID!): User
    inventory: [Inventory]
    inventoryItem(id: ID!): Inventory
    lowStockItems: [Inventory]
    customers: [Customer]
    customer(id: ID!): Customer
    orders: [Order]
    order(id: ID!): Order
    ordersByCustomer(customerId: ID!): [Order]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, role: String): Auth
    login(email: String!, password: String!): Auth
    updateUser(userId: ID!, username: String, email: String, role: String): User
    deleteUser(userId: ID!): User
    addInventoryItem(
      name: String!
      description: String
      quantity: Float!
      unit: String!
      price: Float!
      category: String!
      minStockLevel: Float!
    ): Inventory
    updateInventoryItem(
      id: ID!
      name: String
      description: String
      quantity: Float
      unit: String
      price: Float
      category: String
      minStockLevel: Float
    ): Inventory
    deleteInventoryItem(id: ID!): Inventory
    addCustomer(
      firstName: String!
      lastName: String!
      email: String!
      phone: String
      address: AddressInput
    ): Customer
    updateCustomer(
      id: ID!
      firstName: String
      lastName: String
      email: String
      phone: String
      address: AddressInput
    ): Customer
    deleteCustomer(id: ID!): Customer
    createOrder(
      customerId: ID!
      items: [OrderItemInput!]!
      paymentMethod: String!
      notes: String
    ): Order
    updateOrderStatus(
      id: ID!
      status: String!
    ): Order
    updatePaymentStatus(
      id: ID!
      paymentStatus: String!
    ): Order
    cancelOrder(id: ID!): Order
  }
`;

module.exports = typeDefs; 