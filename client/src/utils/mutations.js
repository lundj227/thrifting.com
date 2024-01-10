import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) { 
    login(username: $username, password: $password) { 
      token
      user {
        _id
      }
    }
  }
`;

export const LOGOUT_USER = gql`
  mutation logout {
    logout
  }
`;

export const ADD_USER = gql`
mutation addUser($firstName: String!, $lastName: String!, $username: String!, $email: String!, $password: String!) {
  addUser(
    firstName: $firstName,
    lastName: $lastName,
    username: $username,
    email: $email,
    password: $password
  ) {
    token
    user {
      _id
      firstName
      lastName
      username
      email
    }
  }
}

`;


// Product Mutations
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      _id
      name
      description
      image
      price
      quantity
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($id: ID!, $input: ProductInput!) {
    updateProduct(_id: $id, input: $input) {
      _id
      name
      description
      image
      price
      quantity
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation AddToCart($productId: ID!, $quantity: Int!) {
    addToCart(productId: $productId, quantity: $quantity) {
      items {
        product {
          _id
          name
          description
          image
          price
        }
        quantity
      }
      totalAmount
    }
  }
`;
