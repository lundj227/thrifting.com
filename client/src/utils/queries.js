import { gql } from '@apollo/client';

// Query for fetching the currently authenticated user's details
export const ME_QUERY = gql`
  query Me {
    me {
      _id
      firstName
      lastName
      email
      favorites {
        _id
        name
        description
        image
        price
        quantity
      }
    }
  }
`;

// Query for fetching all products
export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      _id
      name
      description
      image
      price
      quantity
    }
  }
`;

// Query for fetching a single product by ID
export const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(_id: $id) {
      _id
      name
      description
      image
      price
      quantity
    }
  }
`;

// Query for fetching the favorites of the currently authenticated user
export const GET_FAVORITES = gql`
  query GetFavorites {
    favorites {
      _id
      product {
        _id
        name
        description
        image
        price
        quantity
      }
    }
  }
`;
