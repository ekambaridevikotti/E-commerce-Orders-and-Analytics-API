# 🛒 E-commerce Orders & Analytics API

## 📌 Project Description

This is a RESTful E-commerce backend built using Node.js and Express.js that manages products, orders, and analytics.
The application handles order lifecycle management, product stock updates, and revenue analytics using Higher-Order JavaScript functions.
All data is persisted in a local db.json file without using any external database.


## 🚀 Features

Product stock management

Order creation, cancellation, and status updates

Soft delete for cancelled orders

Revenue and order analytics

Data persistence using JSON file

Clean and modular Express Router architecture


## 🛠️ Tech Stack

Node.js

Express.js

JavaScript (ES Modules)

File System (fs module)

## 📂 Project Structure
```
ecommerce-api/
│
├── package.json
├── db.json
└── src/
    ├── index.js
    └── routes/
        ├── products.routes.js
        ├── orders.routes.js
        └── analytics.routes.js
```

## ⚙️ Installation & Setup

Clone the repository:
```
git clone <your-github-repo-link>
```

Navigate to the project folder:
```
cd ecommerce-api
```

Install dependencies:
```
npm install
```

Start the server:
```
npm start
```

Server will run at:
```
http://localhost:3000
```

## 📦 Database Structure (db.json)
```
{
  "products": [],
  "orders": []
}
```

## 🛍️ Product Schema
```
{
  "id": 1,
  "name": "Mobile",
  "price": 20000,
  "stock": 15
}
```

## 📦 Order Schema
```
{
  "id": 1,
  "productId": 1,
  "quantity": 3,
  "totalAmount": 60000,
  "status": "placed",
  "createdAt": "2026-01-18"
}
```

## 🔁 Orders APIs

### ➕ Create Order

### POST /orders

Calculates totalAmount

Reduces product stock

Rejects if stock is insufficient


## 📄 Get All Orders

GET /orders

Returns all orders including placed, shipped, delivered, and cancelled.


## ❌ Cancel Order (Soft Delete)

DELETE /orders/:orderId

Only allowed on same day of creation

Reverts product stock

Cannot cancel already cancelled orders

## 🔄 Change Order Status

PATCH /orders/change-status/:orderId

Valid flow:
```
placed → shipped → delivered
```

## 📊 Analytics APIs

⚠️ All analytics are computed using map, filter, forEach, and reduce only.

### 📈 All Orders with Count

GET /analytics/allorders


### 🚫 Cancelled Orders with Count

GET /analytics/cancelled-orders


### 🚚 Shipped Orders with Count

GET /analytics/shipped


### 💰 Total Revenue by Product

GET /analytics/total-revenue/:productId

Excludes cancelled orders

Uses reduce for calculation


### 💵 Overall Revenue

GET /analytics/alltotalrevenue

Excludes cancelled orders

Uses reduce


## ✅ Coding Rules Followed

Express Router used for modularity

No loops used for analytics

Proper HTTP status codes

Meaningful JSON responses

Real-time db.json updates

No external database used


## 🧪 Testing

All APIs were tested using Postman to verify:

Complete CRUD flow

Stock management

Order lifecycle

Analytics accuracy

