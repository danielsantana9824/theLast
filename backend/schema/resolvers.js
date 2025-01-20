const { AuthenticationError } = require('apollo-server-express');
const { User, BusinessConfig, InventoryItem, Order, Customer } = require('../models');
const { signToken } = require('../utils/auth');
const { generateOrderNumber } = require('../utils/helpers');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      return await User.findById(context.user._id);
    },

    getBusinessConfig: async (parent, { businessId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      return await BusinessConfig.findById(businessId);
    },

    getInventory: async (parent, { businessId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      return await InventoryItem.find({ businessId, isActive: true });
    },

    getOrders: async (parent, { businessId, status }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      const query = { businessId };
      if (status) query.status = status;
      return await Order.find(query).populate('customer items.item');
    },

    getCustomers: async (parent, { businessId }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      return await Customer.find({ businessId });
    },

    getAnalytics: async (parent, { businessId, startDate, endDate }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }

      const orders = await Order.find({
        businessId,
        createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
        status: 'COMPLETED'
      }).populate('items.item');

      const totalOrders = orders.length;
      const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
      const averageOrderValue = totalRevenue / totalOrders || 0;

      // Calculate top products
      const productMap = new Map();
      orders.forEach(order => {
        order.items.forEach(item => {
          const key = item.item._id.toString();
          if (!productMap.has(key)) {
            productMap.set(key, { item: item.item, count: 0, revenue: 0 });
          }
          const product = productMap.get(key);
          product.count += item.quantity;
          product.revenue += item.price * item.quantity;
        });
      });

      const topProducts = Array.from(productMap.values())
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

      return {
        totalOrders,
        totalRevenue,
        averageOrderValue,
        topProducts,
        periodStart: startDate,
        periodEnd: endDate
      };
    }
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    updateBusinessConfig: async (parent, { businessId, ...updates }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      return await BusinessConfig.findByIdAndUpdate(
        businessId,
        { $set: updates },
        { new: true }
      );
    },

    addInventoryItem: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      return await InventoryItem.create(args);
    },

    updateInventoryItem: async (parent, { _id, ...updates }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      return await InventoryItem.findByIdAndUpdate(
        _id,
        { $set: updates },
        { new: true }
      );
    },

    createOrder: async (parent, { businessId, customerId, items, ...orderData }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }

      // Calculate total and create order items
      let total = 0;
      const orderItems = await Promise.all(items.map(async ({ itemId, quantity, notes }) => {
        const item = await InventoryItem.findById(itemId);
        if (!item) throw new Error(`Item ${itemId} not found`);
        if (item.quantity < quantity) throw new Error(`Insufficient quantity for item ${item.name}`);
        
        const price = item.price * quantity;
        total += price;

        // Update inventory
        await InventoryItem.findByIdAndUpdate(itemId, {
          $inc: { quantity: -quantity }
        });

        return {
          item: itemId,
          quantity,
          price: item.price,
          notes
        };
      }));

      return await Order.create({
        orderNumber: generateOrderNumber(),
        customer: customerId,
        items: orderItems,
        total,
        businessId,
        ...orderData
      });
    },

    updateOrderStatus: async (parent, { orderId, status }, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      return await Order.findByIdAndUpdate(
        orderId,
        { $set: { status } },
        { new: true }
      );
    },

    addCustomer: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError('Not logged in');
      }
      return await Customer.create(args);
    }
  }
};

module.exports = resolvers; 