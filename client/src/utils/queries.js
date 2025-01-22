import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      role
    }
  }
`;

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      role
    }
  }
`;

export const QUERY_RECENT_ORDERS = gql`
  query getRecentOrders {
    recentOrders {
      _id
      customer {
        fullName
      }
      status
      totalAmount
      createdAt
    }
  }
`;

export const QUERY_LOW_STOCK = gql`
  query getLowStockItems {
    lowStockItems {
      _id
      name
      quantity
      minStockLevel
    }
  }
`;

export const QUERY_CUSTOMERS = gql`
  query customers {
    customers {
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

export const QUERY_INVENTORY = gql`
  query inventory {
    inventory {
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

export const QUERY_ORDERS = gql`
  query orders {
    orders {
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

export const QUERY_CUSTOMER_ORDERS = gql`
  query customerOrders($customerId: ID!) {
    customerOrders(customerId: $customerId) {
      _id
      status
      totalAmount
    }
  }
`;