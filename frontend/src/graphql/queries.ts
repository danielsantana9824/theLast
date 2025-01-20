import { gql } from '@apollo/client';

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      email
      role
      permissions
      businessId
    }
  }
`;

export const GET_BUSINESS_CONFIG = gql`
  query getBusinessConfig($businessId: ID!) {
    getBusinessConfig(businessId: $businessId) {
      _id
      businessType
      name
      features
      customFields
    }
  }
`;

export const GET_INVENTORY = gql`
  query getInventory($businessId: ID!) {
    getInventory(businessId: $businessId) {
      _id
      name
      description
      category
      quantity
      price
      unit
      customFields
      isActive
    }
  }
`;

export const GET_ORDERS = gql`
  query getOrders($businessId: ID!, $status: String) {
    getOrders(businessId: $businessId, status: $status) {
      _id
      orderNumber
      status
      total
      items {
        item {
          _id
          name
          price
        }
        quantity
        price
        notes
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_ANALYTICS = gql`
  query getAnalytics($businessId: ID!, $startDate: String!, $endDate: String!) {
    getAnalytics(businessId: $businessId, startDate: $startDate, endDate: $endDate) {
      totalOrders
      totalRevenue
      averageOrderValue
      topProducts {
        item {
          _id
          name
        }
        count
        revenue
      }
      periodStart
      periodEnd
    }
  }
`; 