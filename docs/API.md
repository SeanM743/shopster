# API Documentation

## Overview
The Shopster platform uses a microservices architecture with RESTful APIs. This document covers all available endpoints.

## Base URLs

- **Product Service**: `http://localhost:8082`  
- **User Service**: `http://localhost:8083`
- **Membership Service**: `http://localhost:8084`
- **Cart Service**: `http://localhost:8085`

## Authentication
```bash
# JWT Token required for protected endpoints
Authorization: Bearer <jwt_token>
```

---

## 🛍️ Product Service API

### Product Endpoints

#### Get Random Products
```http
GET /api/v1/products/random?limit=15
```

#### Get Featured Products
```http
GET /api/v1/products/featured?limit=10
```

#### Get Product by ID
```http
GET /api/v1/products/{id}
```

#### Get All Products (Paginated)
```http
GET /api/v1/products?page=0&size=20&sortBy=name&sortDir=ASC
```

#### Search Products
```http
GET /api/v1/products/search?q=iphone&page=0&size=20
```

#### Get Products by Category
```http
GET /api/v1/products/category/Electronics?page=0&size=20
```

### Product Model
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "brand": "string",
  "category": "string",
  "subcategory": "string",
  "sku": "string",
  "price": "decimal",
  "salePrice": "decimal",
  "currency": "string",
  "imageUrl": "string",
  "tags": ["string"],
  "rating": "decimal",
  "reviewCount": "integer",
  "inStock": "boolean",
  "quantity": "integer",
  "badge": "string",
  "featured": "boolean",
  "trending": "boolean",
  "recommended": "boolean",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}
```

---

## 👤 User Service API

### Authentication Endpoints

#### Register User
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### Login User
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com", 
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": "user-id",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe"
    }
  }
}
```

### User Profile Endpoints

#### Get User Profile
```http
GET /api/v1/users/profile
Authorization: Bearer <jwt_token>
```

#### Update User Profile
```http
PUT /api/v1/users/profile
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "+1234567890"
}
```

---

## 💎 Membership Service API

### Shopster+ Plan Endpoints

#### Get All Membership Plans
```http
GET /api/membership/plans
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "planCode": "SHOPSTER_PLUS_MONTHLY",
      "name": "Shopster+ Monthly",
      "description": "Monthly Shopster+ membership with 1-week free trial",
      "price": 9.99,
      "formattedPrice": "$9.99",
      "billingCycle": "MONTHLY",
      "billingCycleDisplay": "Monthly",
      "trialDays": 7,
      "trialDescription": "7-day free trial",
      "planType": "STANDARD",
      "active": true,
      "features": [
        "Free shipping on all orders",
        "Early access to sales",
        "Exclusive member-only deals",
        "Priority customer support",
        "Monthly surprise box",
        "Cancel anytime"
      ]
    }
  ]
}
```

#### Get Plan by Code
```http
GET /api/membership/plans/{planCode}
```

### Subscription Endpoints

#### Create Subscription
```http
POST /api/membership/subscriptions
Content-Type: application/json

{
  "userId": 123,
  "planCode": "SHOPSTER_PLUS_MONTHLY",
  "paymentMethodId": "card_demo_123",
  "paymentMethodType": "CREDIT_CARD",
  "autoRenew": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "userId": 123,
    "plan": { /* plan object */ },
    "status": "TRIALING",
    "trialStartDate": "2024-01-01T00:00:00Z",
    "trialEndDate": "2024-01-08T00:00:00Z",
    "amount": 9.99,
    "paymentMethodId": "card_demo_123",
    "paymentMethodType": "CREDIT_CARD",
    "autoRenew": true,
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Get User's Active Subscription
```http
GET /api/membership/subscriptions/user/{userId}
```

#### Get User's Subscription History
```http
GET /api/membership/subscriptions/user/{userId}/history
```

#### Cancel Subscription
```http
PUT /api/membership/subscriptions/{subscriptionId}/cancel?reason=User%20requested
```

#### Check Membership Status
```http
GET /api/membership/users/{userId}/status
```

**Response:**
```json
{
  "success": true,
  "data": true
}
```

### Subscription Status Values
- `PENDING` - Subscription created, not yet activated
- `TRIALING` - Currently in free trial period
- `ACTIVE` - Active paid subscription
- `CANCELLED` - Cancelled by user or admin
- `EXPIRED` - Subscription expired
- `SUSPENDED` - Temporarily suspended

### Plan Types
- `TRIAL` - Free trial only
- `STANDARD` - Monthly plan ($9.99/month)
- `PREMIUM` - Annual plan ($99.00/year)

---

## 🛒 Shopping Cart API

### Cart Endpoints

#### Get Cart
```http
GET /api/v1/cart
Authorization: Bearer <jwt_token>
```

#### Add to Cart
```http
POST /api/v1/cart/items
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "productId": "product-1",
  "quantity": 2
}
```

#### Update Cart Item
```http
PUT /api/v1/cart/items/{itemId}
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "quantity": 3
}
```

#### Remove from Cart
```http
DELETE /api/v1/cart/items/{itemId}
Authorization: Bearer <jwt_token>
```

---

## 📦 Order API (Planned)

### Order Endpoints

#### Create Order
```http
POST /api/v1/orders
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "items": [
    {
      "productId": "product-1",
      "quantity": 2,
      "price": 999.99
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "Anytown",
    "state": "CA",
    "zipCode": "12345",
    "country": "US"
  }
}
```

#### Get Orders
```http
GET /api/v1/orders?page=0&size=10
Authorization: Bearer <jwt_token>
```

#### Get Order by ID
```http
GET /api/v1/orders/{orderId}
Authorization: Bearer <jwt_token>
```

---

## ❌ Error Responses

All APIs return consistent error responses:

```json
{
  "success": false,
  "error": "Error message",
  "code": 400,
  "timestamp": "2024-01-01T00:00:00Z",
  "path": "/api/v1/products"
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created  
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## 🔧 Health & Monitoring

### Health Check
```http
GET /actuator/health
```

### Metrics
```http  
GET /actuator/metrics
```

### Info
```http
GET /actuator/info
```

---

## 🧪 Testing

### Example API Calls

```bash
# Get random products
curl http://localhost:8082/api/v1/products/random?limit=15



# Search products
curl "http://localhost:8082/api/v1/products/search?q=iPhone"

# Health check
curl http://localhost:8082/actuator/health

# Get Shopster+ plans
curl http://localhost:8084/api/membership/plans

# Get user's active subscription
curl http://localhost:8084/api/membership/subscriptions/user/123

# Check membership status
curl http://localhost:8084/api/membership/users/123/status
```

### Rate Limiting
- Default: 100 requests per minute per IP
- Authenticated: 1000 requests per minute per user

### API Versioning
All APIs are versioned using URL path: `/api/v1/`

Future versions will be: `/api/v2/`, etc.