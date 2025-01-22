# Restaurant Management System

## Description

A modern, elegant restaurant management system inspired by Apple's design philosophy. Built with the MERN stack (MongoDB, Express.js, React, Node.js), this application provides a seamless experience for managing restaurant operations with a focus on simplicity and efficiency. The system features real-time inventory tracking, comprehensive order management, and robust customer relationship management capabilities.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [API Documentation](#api-documentation)
- [Credits](#credits)
- [License](#license)
- [Questions](#questions)

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Backend setup
   cd backend
   npm install

   # Frontend setup
   cd ../frontend
   npm install
   ```
3. Configure environment variables:
   Create `.env` in backend directory:
   ```
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   PORT=3001
   ```
4. Set up MongoDB:
   - Install MongoDB locally or use MongoDB Atlas
   - Configure your connection string in the .env file

## Usage

1. Start backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Access the application:
   - Frontend: http://localhost:3000
   - GraphQL Playground: http://localhost:3001/graphql

## Features

### User Management
- 🔐 Secure JWT Authentication
- 👥 Role-based access control (Admin/Employee)
- 🔑 Secure password hashing with bcrypt

### Dashboard
- 📊 Interactive Analytics Dashboard
- 📉 Real-time performance metrics
- ⚠️ Low stock alerts
- 📈 Sales analytics

### Inventory Management
- 📦 Real-time inventory tracking
- 🏷️ Category-based organization
- ⚡ Automatic low stock alerts
- 📝 Detailed item tracking with units and pricing

### Order Processing
- 🛍️ Streamlined order creation and management
- 📱 Real-time order status updates
- 💳 Multiple payment methods support
- 📋 Order history tracking

### Customer Management
- 👥 Comprehensive customer profiles
- 📱 Contact information management
- 🗺️ Address tracking
- 🎯 Customer preferences recording

### Interface
- 📱 Responsive Apple-inspired Design
- 🎨 Elegant UI with Chakra UI
- ⚡ Fast and intuitive navigation
- 📊 Interactive data visualization

## Technologies Used

### Frontend
- React with TypeScript
- Apollo Client for GraphQL
- Chakra UI for styling
- Framer Motion for animations
- React Router DOM for routing
- React Icons

### Backend
- Node.js & Express.js
- GraphQL with Apollo Server
- MongoDB & Mongoose
- JWT Authentication
- bcrypt for password hashing

### Development Tools
- Git & GitHub
- VS Code
- MongoDB Compass
- GraphQL Playground
- dotenv for environment variables
- nodemon for development

## API Documentation

### Main GraphQL Endpoints:

#### Queries:
- Users: Fetch user information
- Inventory: Get inventory items
- Orders: Retrieve order details
- Customers: Access customer data

#### Mutations:
- Authentication: Login and user management
- Inventory: Create, update, delete items
- Orders: Process and manage orders
- Customers: Manage customer information

## Credits

Developed by:
- Marcello Romero
- Larry Flecher
- John Ferlito
- Danie Ramirez

## License

This project is licensed under the MIT License.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Questions

For any questions or concerns, please:
- Open an issue in the GitHub repository
- Contact the development team at mra24@me.com

GitHub: [marcelloro24](https://github.com/marcelloro24)