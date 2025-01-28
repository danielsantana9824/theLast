# Podcast Gear E-commerce Platform

## Description
A modern MERN stack e-commerce application that provides a seamless shopping experience. This full-featured platform allows users to browse products, manage their shopping cart, process secure payments, and track order history. Built with modern web technologies, it offers an intuitive interface that's both responsive and user-friendly.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Credits](#credits)
- [License](#license)

## Installation

1. Install dependencies for both client and server:
```bash
npm install
```
2. Create a `.env` file in the server directory with the following variables:
```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```
3. Start the development server:
```bash
npm run develop
```

## Usage
1. Access the application through your web browser at `http://localhost:3000`
2. Register for a new account or log in with existing credentials
3. Browse products by category
4. Add items to your shopping cart
5. Process secure payments using Stripe
6. View order history

## Features
### Core Functionality
- **User Authentication & Authorization**
  - Secure login/registration system
  - JWT token authentication
  - Protected routes

- **Shopping Experience**
  - Product browsing
  - Category filtering
  - Shopping cart management
  - Order history tracking

- **Payment Processing**
  - Secure Stripe integration
  - Order confirmation
  - Transaction history

### Technical Features
- **Security**
  - JWT authentication
  - Encrypted passwords
  - Protected API routes
  - Secure payment processing

- **Performance**
  - Optimized database queries
  - Efficient state management
  - Fast page loading
  - Responsive design

- **PWA Capabilities**
  - Offline functionality
  - Installable application
  - Service worker integration

## Technologies Used
### Frontend
- React 18.2.0
- Chakra UI for styling
- Apollo Client for GraphQL
- React Router for navigation
- Vite for build tooling

### Backend
- Node.js
- Express.js
- GraphQL with Apollo Server
- MongoDB with Mongoose ODM
- JWT for authentication

### Payment Processing
- Stripe integration
- Secure payment handling
- Transaction management

### Development Tools
- Git for version control
- ESLint for code quality
- Prettier for code formatting
- Vite for development server

## Credits
Developed by:
- Marcello Romero
- John Ferlito
- Danie Ramirez
- Larry Fletcher

## License
This project is licensed under the MIT License.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Questions
For any questions or concerns, please open an issue in the GitHub repository or contact the developer directly.

- Project Repository: [Podcast Gear](https://github.com/danielsantana9824/theLast/tree/main)
- Deployed Application: [Live Demo](https://thelast-w1jl.onrender.com)

---

### Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

### Deployment
This application is deployed on Render. For deployment instructions, please refer to the [deployment guide](https://coding-boot-camp.github.io/full-stack/render/deploy-mern-stack-with-render-guide).

### Acknowledgments
- MongoDB Atlas for database hosting
- Render for application hosting
- Stripe for payment processing
