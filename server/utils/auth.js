const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET || 'mytemporarysecret';
const expiration = '2h';

module.exports = {
  // Authentication middleware
  authMiddleware: function ({ req }) {
    // Allows token to be sent via req.body, req.query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // Remove "Bearer" from token
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return req;
    }

    try {
      // Verify token and attach user data to request
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      console.log('Invalid token');
    }

    return req;
  },

  // Sign token
  signToken: function ({ email, username, _id, role }) {
    const payload = { email, username, _id, role };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
}; 