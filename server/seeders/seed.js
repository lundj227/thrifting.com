const mongoose = require('mongoose');
const Product = require('../models/Product');
const { ObjectId } = mongoose.Types; 

mongoose.connect('mongodb://127.0.0.1:27017/thrifting', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const validCategoryObjectId = new ObjectId();

const sampleProduct = new Product({
  name: 'Sample Product',
  price: 1.99,
  category: validCategoryObjectId
});

sampleProduct.save()
  .then(() => {
    console.log('Sample product created successfully.');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('Error creating sample product:', err);
  });
