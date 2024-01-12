const User = require('../models/User');
const Product = require('../models/Product');
const Favorite = require('../models/Favorite');
const { signToken } = require('../utils/auth');  
const { AuthenticationError } = require('apollo-server-errors');


async function calculateTotalAmount(cartItems) {
  let totalAmount = 0;

  for (const cartItem of cartItems) {
    const product = await Product.findById(cartItem.product);
    if (product) {
      totalAmount += product.price * cartItem.quantity;
    }
  }

  return totalAmount;
}

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      
      if (context.user) {
        return context.user;
      }
      throw new Error('Not authenticated.');
    },
    products: async () => {
     
      return Product.find();
    },
    product: async (_, { _id }) => {
      
      return Product.findById(_id);
    },
    favorites: async (_, __, context) => {
      
      if (context.user) {
        return Favorite.find({ user: context.user._id }).populate('product');
      }
      throw new Error('Not authenticated.');
    },
  },
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error("User not found.");
      }
  
      const isMatch = await user.isCorrectPassword(password);
      if (!isMatch) {
        throw new Error("Incorrect password.");
      }
  
      const token = signToken(user);
      return { token, user };
    },
    logout: async (parent, args, context) => {
    
      if (!context.user) {
        throw new Error("User is not authenticated.");
      }
    
      try {
        
        context.req.logout();  
    
        return true;  
      } catch (error) {
        console.error("Logout error:", error);
        throw new Error("An error occurred during logout.");
      }
    },
    
    
    addUser: async (_, args) => {
      try {
        const user = await User.create(args); // Create a new user
        const token = signToken(user); // Generate a token for the new user
        return { token, user };
      } catch (error) {
        // Handle any errors that occur during user creation
        throw new AuthenticationError('User registration failed.');
      }
    },
 
    
    createProduct: async (_, { input }) => {
      const product = await Product.create(input);
      return product;
    },
    updateProduct: async (_, { _id, input }) => {
      const updatedProduct = await Product.findByIdAndUpdate(_id, input, { new: true });
      return updatedProduct;
    },    
    deleteProduct: async (_, { _id }) => {
      
      await Product.findByIdAndDelete(_id);
      return true;
    },

    addToCart: async (_, { productId, quantity }, context) => {
      // Check if the user is authenticated based on the context
      if (!context.user) {
        throw new Error('Not authenticated.');
      }
    
      try {
        // Find the user by their ID
        const user = await User.findById(context.user._id);
        if (!user) {
          throw new Error('User not found.');
        }
    
        // Find the product by its ID
        const product = await Product.findById(productId);
        if (!product) {
          throw new Error('Product not found.');
        }
    
        // Check if the product is already in the user's cart
        const existingCartItemIndex = user.cart.items.findIndex(
          (item) => item.product.toString() === productId
        );
    
        if (existingCartItemIndex > -1) {
          // If the product already exists in the cart, update the quantity
          user.cart.items[existingCartItemIndex].quantity += quantity;
        } else {
          // If the product is not in the cart, add it to the cart
          user.cart.items.push({ product: productId, quantity });
        }
    
        // Save the user with the updated cart
        await user.save();
    
        // Calculate the total amount of the cart
        const totalAmount = await calculateTotalAmount(user.cart.items);
    
        // Return the updated cart
        return {
          items: user.cart.items,
          totalAmount,
        };
      } catch (error) {
        console.error('Error in addToCart:', error);
        throw new Error('An error occurred while adding to the cart.');
      }
    },
    

  },
  User: {
  
    favorites: async (user) => {
      
      return Favorite.find({ user: user._id }).populate('product');
    },
  },
  Product: {
    
  },
  Favorite: {
    
    user: async (favorite) => {
      
      return User.findById(favorite.user);
    },
    product: async (favorite) => {
      
      return Product.findById(favorite.product);
    },
  },
};

module.exports = resolvers;
