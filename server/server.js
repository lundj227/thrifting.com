// Importing required modules
 
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const cors = require('cors'); 
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');
const helmet = require('helmet');
 

require("dotenv").config();

// Server configuration
const PORT = process.env.PORT || 3001;
const app = express();

app.use(cors());
// Middleware for parsing JSON and urlencoded data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://apollo-server-landing-page.cdn.apollographql.com"],
      imgSrc: ["'self'", "data:", "https://apollo-server-landing-page.cdn.apollographql.com"],
      // Add other directives as needed
    },
  })
);

// Apollo Server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: authMiddleware,
});


 
 
// Serve static files in production mode
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
 
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Starting Apollo Server and Express app
const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    });
  });
};

startApolloServer();