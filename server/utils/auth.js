const jwt = require('jsonwebtoken');

 
const secret = 'mysecretsshhhhh';
const expiration = '2h';

module.exports = {
 
  authMiddleware: function ({req}) {
   
    let token = req.query.token || req.headers.authorization || req.body.token;
    console.log("Token before splitting:", token);

    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
  console.log("Token after splitting:", token);

    if (!token) {
      return req;
    }

    
   try {
  const { data } = jwt.verify(token, secret, { maxAge: expiration });
  req.user = data;
  console.log('User from token:', req.user);
} catch {
  console.log('Invalid token');
  return req;
}

   
    return req;
  },
  signToken: function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};