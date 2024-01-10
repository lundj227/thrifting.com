const User = require('../models/User');
const Product = require('../models/Product');
const Favorite = require('../models/Favorite');
const { signToken } = require('../utils/auth');  
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
    
    
    addUser: async (_, { firstName, lastName, username, email, password }) => {
      const user = await User.create({ firstName, lastName, username, email, password });
      if (!user) {
        throw new Error('Something is wrong!');
      }
  
      const token = signToken(user);
      return { token, user };
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
      // Validate user authentication
      if (!context.user) {
        throw new Error('Not authenticated.');
      }
    
      // Fetch the user's cart or create a new one if it doesn't exist
      const user = await User.findById(context.user._id).populate('cart');
    
      // Find the product that the user wants to add to the cart
      const product = await Product.findById(productId);
    
      if (!product) {
        throw new Error('Product not found.');
      }
    
      // Check if the product is already in the user's cart
      const existingCartItem = user.cart.items.find(item => item.product.toString() === productId);
    
      if (existingCartItem) {
        // If the product is already in the cart, update the quantity
        existingCartItem.quantity += quantity;
      } else {
        // If the product is not in the cart, add a new cart item
        user.cart.items.push({
          product: productId,
          quantity: quantity,
        });
      }
    
      // Calculate the totalAmount based on cart items
      let totalAmount = 0;
      for (const item of user.cart.items) {
        const product = await Product.findById(item.product);
        if (product) {
          totalAmount += product.price * item.quantity;
        }
      }
    
      // Save the updated cart and user
      await user.cart.save();
      await user.save();
    
      // Return the updated Cart object (with items and totalAmount)
      return {
        items: user.cart.items,
        totalAmount: totalAmount,
      };
    }
    

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
