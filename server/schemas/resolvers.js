const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    users: async (parent, args, context) => {
      if (context.user && context.user.role === 'ADMIN') {
        return User.find();
      }
      throw new AuthenticationError('Admin access required!');
    },
    user: async (parent, { userId }, context) => {
      if (context.user && context.user.role === 'ADMIN') {
        return User.findOne({ _id: userId });
      }
      throw new AuthenticationError('Admin access required!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password, role }) => {
      const user = await User.create({ username, email, password, role });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user found with this email address');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
    updateUser: async (parent, args, context) => {
      if (context.user && context.user.role === 'ADMIN') {
        return User.findByIdAndUpdate(args.userId, args, { new: true });
      }
      throw new AuthenticationError('Admin access required!');
    },
    deleteUser: async (parent, { userId }, context) => {
      if (context.user && context.user.role === 'ADMIN') {
        return User.findByIdAndDelete(userId);
      }
      throw new AuthenticationError('Admin access required!');
    },
  },
};

module.exports = resolvers; 