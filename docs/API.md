# API Documentation

## Overview
The Shopster platform uses a microservices architecture with RESTful APIs. This document covers all available endpoints.

## Base URLs
- **BFF (Frontend API)**: `http://localhost:8081`
- **Product Service**: `http://localhost:8082`  
- **User Service**: `http://localhost:8083`

## Authentication
```bash
# JWT Token required for protected endpoints
Authorization: Bearer <jwt_token>
```

---

## 🏠 BFF Orchestration API

### Homepage Endpoints

#### Get Hero Content
```http
GET /api/v1/homepage/hero-content
```

**Response:**
```json
{
  "success": true,
  "data": {
    "cards": [
      {
        "id": "hero-1",
        "title": "Summer Sale",
        "description": "Up to 50% off selected items",
        "imageUrl": "https://example.com/hero1.jpg",
        "ctaText": "Shop Now",
        "ctaLink": "/categories/sale",
        "sortOrder": 1
      }
    ]
  }
}
```

#### Get Product Carousel
```http
GET /api/v1/homepage/product-carousel/{carouselType}?limit=15
```

**Parameters:**
- `carouselType`: `featured`, `trending`, `recommended`, `random`
- `limit`: Number of products (1-50)

**Response:**
```json
{
  "success": true,
  "data": {
    "title": "Featured Products",
    "products": [
      {
        "id": "product-1",
        "name": "iPhone 15 Pro",
        "brand": "Apple",
        "category": "Electronics",
        "price": 999.99,
        "salePrice": 949.99,
        "imageUrl": "https://images.unsplash.com/...",
        "rating": 4.8,
        "reviewCount": 256,
        "inStock": true,
        "badge": "sale"
      }
    ],
    "viewAllLink": "/products?category=featured"
  }
}
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

## 👤 User Service API (Planned)

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

## 🛒 Shopping Cart API (Planned)

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

# Get featured products via BFF
curl http://localhost:8081/api/v1/homepage/product-carousel/featured?limit=10

# Search products
curl "http://localhost:8082/api/v1/products/search?q=iPhone"

# Health check
curl http://localhost:8082/actuator/health
```

### Rate Limiting
- Default: 100 requests per minute per IP
- Authenticated: 1000 requests per minute per user

### API Versioning
All APIs are versioned using URL path: `/api/v1/`

Future versions will be: `/api/v2/`, etc.