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