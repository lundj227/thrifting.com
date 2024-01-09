const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {  
    type: String,
    required: true,
    unique: true,
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
  
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// Method to compare provided password with the hashed password in the database
userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

 
const User = mongoose.model('User', userSchema);

module.exports = User;
