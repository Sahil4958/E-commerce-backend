# E-Commerce Backend

This is a **Node.js + TypeScript** backend for an E-commerce application. It provides APIs for user authentication, product management, cart, orders, and dashboards for both users and admins. The project uses **MongoDB** with Mongoose and includes JWT-based authentication.

---

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
  - [Auth](#auth)
  - [Users](#users)
  - [Products](#products)
  - [Cart](#cart)
  - [Orders](#orders)
  - [User Dashboard](#user-dashboard)
  - [Admin Dashboard](#admin-dashboard)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- User registration and login with JWT authentication
- User roles: `Admin` and `Employee/User`
- CRUD operations for products
- Cart management
- Order checkout, status update, and cancellation
- Dashboard metrics:
  - **User Dashboard:** Orders, Profile
  - **Admin Dashboard:** Global metrics, Sales reports, Order statuses, User management, Product listings
- Stock management: decreases on order, restores on cancellation
- Email and notifications support

---

## Tech Stack
- Node.js + TypeScript
- Express.js
- MongoDB + Mongoose
- JWT for authentication
- bcrypt for password hashing
- Cloudinary for image storage
- Swagger for API documentation
- dotenv for environment variables

---

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Sahil4958/E-commerce-backend.git
cd E-commerce-backend

2) Install dependencies:

npm install

3)Configure environment variables. Create a .env file:

PORT=5002
MONGO_URI=your_mongodb_connection_string
JWT_SECRETKEY=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

4)Running the Project

npm run dev

5)API Endpoints

--> Auth

POST /api/v1/auth/register – Register a new user

POST /api/v1/auth/login – User login



--> Users

GET /api/v1/users/:id – Get user by ID

PATCH /api/v1/users/:id – Update user profile

--> Products

POST /api/v1/products – Create a new product (Admin only)

GET /api/v1/products – Get all products

GET /api/v1/products/:id – Get product by ID

PATCH /api/v1/products/:id – Update product (Admin only)

DELETE /api/v1/products/:id – Delete product (Admin only)

--> Cart

POST /api/v1/cart – Add item to cart

GET /api/v1/cart – Get user cart

PATCH /api/v1/cart/:itemId – Update cart item quantity

DELETE /api/v1/cart/:itemId – Remove item from cart

--> Orders

POST /api/v1/orders/checkout – Checkout cart to create order

GET /api/v1/orders/:id – Get order by ID

GET /api/v1/orders – Get all user orders

PATCH /api/v1/orders/:id – Update order

PATCH /api/v1/orders/:id/status – Update order status

PATCH /api/v1/orders/:id – Cancel order

User Dashboard

GET /api/v1//orders – Get all user orders

GET /api/v1/user/profile – Get user profile

PATCH /api/v1/user/profile – Update user profile

Admin Dashboard

GET /api/v1/admin/metrics – Global metrics (KPIs)

GET /api/v1/admin/sales – Sales report

GET /api/v1/admin/order-statuses – Order status breakdown

GET /api/v1/admin/users – List all users

GET /api/v1/admin/products – List all products



