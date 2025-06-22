# MERN E-commerce Platform

A full-stack e-commerce application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- **Authentication System**: Login, registration, and role-based access control.
- **Role-Based User System**: Admin, Staff (with subroles), and regular users.
- **Product Management**: Create, read, update, and delete products.
- **Order Management**: Process orders with different status workflows.
- **Shopping Cart**: Add products to cart, adjust quantities, and checkout.

## Project Structure

```
├── backend/                  # Express.js server
│   ├── config/               # Configuration files
│   ├── middleware/           # Authentication middleware
│   ├── models/               # MongoDB models (User, Product, Order)
│   └── routes/               # API routes
│       ├── auth.js           # Authentication routes
│       ├── products.js       # Product management routes
│       └── orders.js         # Order management routes
└── frontend/                 # React client
    ├── public/               # Static files
    └── src/                  # React source code
        ├── assets/           # Images and other assets
        ├── components/       # Reusable components
        ├── constants/        # Constants including routes
        ├── features/         # Feature-based organization
        │   ├── admin/        # Admin features
        │   ├── auth/         # Authentication features
        │   ├── cart/         # Shopping cart features
        │   └── dashboard/    # Dashboard features
        ├── hooks/            # Custom React hooks
        ├── roles/            # Role-based components
        │   ├── admin/        # Admin role components
        │   ├── staff/        # Staff role components
        │   │   ├── subroles/ # Staff subrole components
        │   └── user/         # User role components
        ├── routes/           # Routing configuration
        ├── services/         # API services
        ├── styles/           # Global styles
        └── types/            # TypeScript type definitions
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or Atlas)

### Installation

1. Clone the repository
2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```
3. Install frontend dependencies:
   ```
   cd frontend
   npm install
   ```

### Configuration

Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern-ecommerce
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URL=http://localhost:1204
ADMIN_EMAILS=admin@example.com
```

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm run dev
   ```

2. Start the frontend development server:
   ```
   cd frontend
   npm run dev -- --port 1204
   ```

3. Open your browser and go to `http://localhost:1204`

## User Roles

1. **Admin** - Full access to all features
   - Manage products, categories, and inventory
   - Manage users and staff accounts
   - View and process all orders
   - Access to sales reports and statistics

2. **Staff** - Role-based access to specific features
   - **Warehouse Staff** - Manage inventory and update stock levels
   - **Shipping Staff** - Process orders and update shipping status

3. **User** - Regular customer features
   - Browse products and categories
   - Add items to cart
   - Place orders
   - View order history and status

## API Endpoints

### Authentication

- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Login a user
- `GET /api/auth/user`: Get current user data

### Products

- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get a product by ID
- `POST /api/products`: Create a new product (admin only)
- `PUT /api/products/:id`: Update a product (admin only)
- `DELETE /api/products/:id`: Delete a product (admin only)
- `POST /api/products/:id/ratings`: Add a rating to a product
- `PUT /api/products/:id/stock`: Update product stock (admin/warehouse staff)

### Orders

- `GET /api/orders`: Get all orders or user orders
- `GET /api/orders/:id`: Get an order by ID
- `POST /api/orders`: Create a new order
- `PUT /api/orders/:id/status`: Update order status (admin/staff)
- `PUT /api/orders/:id/payment`: Update payment status (admin only)
- `GET /api/orders/user/stats`: Get order statistics for current user
