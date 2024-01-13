const User = require('../models/User');
const Product = require('../models/Product');
const Favorite = require('../models/Favorite');
const { signToken } = require('../utils/auth');  
const { AuthenticationError } = require('apollo-server-errors');

async function calculateTotalAmount(cartItems) {
  if (!cartItems || cartItems.length === 0) {
    return 0; // Handle empty or null cartItems
  }

  const productIds = cartItems.map((item) => item && item.product).filter(Boolean);
  const products = await Product.find({ _id: { $in: productIds } });

  if (!products || products.length === 0) {
    return 0; // Handle case where no products are found
  }

  let totalAmount = 0;

  for (const cartItem of cartItems) {
    if (!cartItem || !cartItem.product) continue; // Skip if cartItem or cartItem.product is null

    const product = products.find((p) => p && p._id && cartItem.product && p._id.toString() === cartItem.product.toString());
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
      if (!context.user) {
        throw new Error('Not authenticated.');
      }
    
      try {
        const user = await User.findById(context.user._id);
    
        if (!user) {
          throw new Error('User not found.');
        }
    
        // Validate productId and quantity
        if (!productId || quantity <= 0) {
          throw new Error('Invalid product ID or quantity.');
        }
    
        const cartItem = user.cart.find((item) => item && item.product.toString() === productId);
    
        if (cartItem) {
          cartItem.quantity += quantity;
        } else {
          user.cart.push({ product: productId, quantity });
        }
    
        user.markModified('cart');
        await user.save();
    
        const populatedUser = await User.findById(user._id).populate('cart.product');
    
        const totalAmount = await calculateTotalAmount(populatedUser.cart);
    
        return {
          items: populatedUser.cart,
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
