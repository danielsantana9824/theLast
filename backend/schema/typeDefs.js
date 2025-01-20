const { gql } = require('apollo-server-express');

const typeDefs = gql`
  # Business Configuration
  type BusinessConfig {
    _id: ID!
    businessType: String!
    name: String!
    features: [String]!
    customFields: JSON
  }

  # User Management
  type User {
    _id: ID!
    username: String!
    email: String!
    role: String!
    permissions: [String]!
    businessId: ID!
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  # Inventory Management
  type InventoryItem {
    _id: ID!
    name: String!
    description: String
    category: String!
    quantity: Int!
    price: Float
    unit: String
    customFields: JSON
    businessId: ID!
    isActive: Boolean!
  }

  # Order Management
  type Order {
    _id: ID!
    orderNumber: String!
    customer: Customer
    items: [OrderItem]!
    status: String!
    total: Float!
    notes: String
    customFields: JSON
    businessId: ID!
    createdAt: String!
    updatedAt: String!
  }

  type OrderItem {
    item: InventoryItem!
    quantity: Int!
    price: Float!
    notes: String
  }

  # Customer Management
  type Customer {
    _id: ID!
    name: String!
    email: String
    phone: String
    address: Address
    orders: [Order]
    customFields: JSON
    businessId: ID!
    createdAt: String!
  }

  type Address {
    street: String
    city: String
    state: String
    zipCode: String
    country: String
  }

  # Analytics
  type Analytics {
    totalOrders: Int!
    totalRevenue: Float!
    averageOrderValue: Float!
    topProducts: [AnalyticsItem]!
    periodStart: String!
    periodEnd: String!
  }

  type AnalyticsItem {
    item: InventoryItem!
    count: Int!
    revenue: Float!
  }

  # Custom Scalar for flexible data
  scalar JSON

  # Queries
  type Query {
    me: User
    getBusinessConfig(businessId: ID!): BusinessConfig
    getInventory(businessId: ID!): [InventoryItem]!
    getOrders(businessId: ID!, status: String): [Order]!
    getCustomers(businessId: ID!): [Customer]!
    getAnalytics(businessId: ID!, startDate: String!, endDate: String!): Analytics!
  }

  # Mutations
  type Mutation {
    # Auth Mutations
    login(email: String!, password: String!): Auth
    addUser(
      username: String!
      email: String!
      password: String!
      role: String!
      businessId: ID!
    ): Auth

    # Business Config Mutations
    updateBusinessConfig(
      businessId: ID!
      name: String
      features: [String]
      customFields: JSON
    ): BusinessConfig

    # Inventory Mutations
    addInventoryItem(
      businessId: ID!
      name: String!
      description: String
      category: String!
      quantity: Int!
      price: Float
      unit: String
      customFields: JSON
    ): InventoryItem

    updateInventoryItem(
      _id: ID!
      name: String
      description: String
      category: String
      quantity: Int
      price: Float
      unit: String
      customFields: JSON
    ): InventoryItem

    # Order Mutations
    createOrder(
      businessId: ID!
      customerId: ID!
      items: [OrderItemInput]!
      notes: String
      customFields: JSON
    ): Order

    updateOrderStatus(
      orderId: ID!
      status: String!
    ): Order

    # Customer Mutations
    addCustomer(
      businessId: ID!
      name: String!
      email: String
      phone: String
      address: AddressInput
      customFields: JSON
    ): Customer
  }

  input OrderItemInput {
    itemId: ID!
    quantity: Int!
    notes: String
  }

  input AddressInput {
    street: String!
    city: String!
    state: String!
    zipCode: String!
    country: String!
  }
`;

module.exports = typeDefs; 