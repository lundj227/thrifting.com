const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID!
  firstName: String!
  lastName: String!
  username: String! 
  email: String!
  favorites: [Product]!
}

  type Auth{
    token: String!
    user: User
}

  type Product {
    _id: ID!
    name: String!
    description: String
    image: String
    price: Float!
    quantity: Int!
  }

  type Favorite {
    _id: ID!
    user: User!
    product: Product!
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  input ProductInput {
    name: String!
    description: String
    image: String
    price: Float!
    quantity: Int!
  }

  type Query {
    me: User 
    products: [Product]  
    product(_id: ID!): Product  
    favorites: [Favorite]  
  }

  type UserLoginResponse {
    token: String!
    user: User!
  }

  type CartItem {
    id: ID!
    quantity: Int!
    product: Product!
  }
  
  type Cart {
    items: [CartItem!]!
    totalAmount: Float!
  }
  

  type Mutation {
    login(username: String!, password: String!): Auth
    logout: Boolean 
    addUser(firstName: String!, lastName: String!, username: String!, email: String!, password: String!): Auth
    addFavorite(productId: ID!): Favorite  
    removeFavorite(favoriteId: ID!): Boolean  
    createProduct(input: ProductInput): Product  
    updateProduct(_id: ID!, input: ProductInput): Product 
    deleteProduct(_id: ID!): Boolean 
    addToCart(productId: ID!, quantity: Int!): Cart
  }
`;

module.exports = typeDefs;
