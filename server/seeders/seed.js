const mongoose = require('mongoose');
const Product = require('../models/Product');
const { ObjectId } = mongoose.Types;

mongoose.connect('mongodb://127.0.0.1:27017/thrifting', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const validCategoryObjectId = new ObjectId();

// Define an array of sample products with images
const sampleProducts = [
  {
    name: 'Product 1',
    price: 19.99,
    category: validCategoryObjectId,
    image: '/images/clothing1.jpg'
  },
  {
    name: 'Product 2',
    price: 29.99,
    category: validCategoryObjectId,
    image: '/images/clothing2.jpg'
  },
  {
    name: 'Product 3',
    price: 14.99,
    category: validCategoryObjectId,
    image: '/images/clothing3.jpg'
  },
  {
    name: 'Product 4',
    price: 24.99,
    category: validCategoryObjectId,
    image: '/images/clothing4.jpg'
  },
  {
    name: 'Product 5',
    price: 39.99,
    category: validCategoryObjectId,
    image: '/images/clothing5.jpg'
  },
  {
    name: 'Product 6',
    price: 9.99,
    category: validCategoryObjectId,
    image: '/images/clothing6.jpg'
  },
  {
    name: 'Product 7',
    price: 9.99,
    category: validCategoryObjectId,
    image: '/images/clothing7.jpg'
  },
  {
    name: 'Product 8',
    price: 9.99,
    category: validCategoryObjectId,
    image: '/images/clothing8.jpg'
  },
];


// Use a loop to create and save multiple products
Promise.all(
  sampleProducts.map((productData) => {
    const product = new Product(productData);
    return product.save();
  })
)
  .then(() => {
    console.log('Sample products created successfully.');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error creating sample products:', err);
    mongoose.connection.close();
  });