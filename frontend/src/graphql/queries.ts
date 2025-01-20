import { gql } from '@apollo/client';

export const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
      role
      businessId
    }
  }
`;

export const GET_BUSINESS_CONFIG = gql`
  query GetBusinessConfig($businessId: ID!) {
    getBusinessConfig(businessId: $businessId) {
      _id
      name
      businessType
      features
    }
  }
`;

export const GET_INVENTORY = gql`
  query GetInventory($businessId: ID!) {
    getInventory(businessId: $businessId) {
      _id
      name
      description
      category
      quantity
      price
      unit
      isActive
    }
  }
`;

export const GET_ORDERS = gql`
  query GetOrders($businessId: ID!, $status: String) {
    getOrders(businessId: $businessId, status: $status) {
      _id
      orderNumber
      status
      total
      createdAt
      customer {
        name
      }
      items {
        item {
          name
        }
        quantity
        price
      }
    }
  }
`;

export const GET_CUSTOMERS = gql`
  query GetCustomers($businessId: ID!) {
    getCustomers(businessId: $businessId) {
      _id
      name
      email
      phone
      address {
        city
        state
      }
    }
  }
`;

export const GET_ANALYTICS = gql`
  query GetAnalytics($businessId: ID!, $startDate: String!, $endDate: String!) {
    getAnalytics(businessId: $businessId, startDate: $startDate, endDate: $endDate) {
      totalOrders
      totalRevenue
      averageOrderValue
      topProducts {
        item {
          name
        }
        count
        revenue
      }
    }
  }
`; 