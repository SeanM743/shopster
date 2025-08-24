# Database Schema Documentation

## Overview
The Shopster platform uses a polyglot persistence approach with different databases optimized for specific use cases.

## Database Architecture

```
┌─────────────────────┐    ┌─────────────────────┐    ┌─────────────────────┐
│                     │    │                     │    │                     │
│     MongoDB         │    │    PostgreSQL       │    │      Redis          │
│   (Products)        │    │     (Users)         │    │   (Sessions/Cache)  │
│   Port: 27017       │    │   Port: 5432        │    │   Port: 6379        │
│                     │    │                     │    │                     │
└─────────────────────┘    └─────────────────────┘    └─────────────────────┘
```

---

## 🍃 MongoDB - Product Database

**Database**: `shopster_products_dev`  
**Collections**: `products`

### Product Collection Schema

```javascript
{
  _id: ObjectId("..."),
  name: "iPhone 15 Pro",
  description: "Latest iPhone with advanced camera system",
  brand: "Apple",
  category: "Electronics",
  subcategory: "Smartphones",
  tags: ["smartphone", "apple", "mobile", "5g"],
  sku: "IPHONE15PRO128",
  price: NumberDecimal("999.99"),
  sale_price: NumberDecimal("949.99"),
  currency: "USD",
  
  // Images array
  images: [
    {
      url: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab",
      alt: "iPhone 15 Pro product image",
      isPrimary: true,
      zoomUrl: "https://...",
      type: "product",
      sortOrder: 0
    }
  ],
  
  // Specifications map
  specifications: {
    "Screen Size": "6.1 inches",
    "Storage": "128GB",
    "Camera": "48MP",
    "Processor": "A17 Pro"
  },
  
  // Variants array
  variants: [
    {
      id: "iphone15pro-blue-128",
      name: "Blue 128GB",
      sku: "IPHONE15PRO128BLU",
      price: NumberDecimal("999.99"),
      attributes: {
        color: "Blue",
        storage: "128GB"
      },
      inventory: {
        quantity: 10,
        inStock: true
      }
    }
  ],
  
  // Inventory object
  inventory: {
    quantity: 50,
    inStock: true,
    lowStockThreshold: 10,
    trackQuantity: true,
    allowBackorders: false,
    reservedQuantity: 5,
    stockStatus: "in_stock"
  },
  
  // Rating object
  rating: {
    average: NumberDecimal("4.8"),
    count: 256,
    distribution: {
      "5": 180,
      "4": 56, 
      "3": 15,
      "2": 3,
      "1": 2
    }
  },
  
  // Shipping info
  shipping: {
    weight: 0.5,
    dimensions: {
      length: 6.1,
      width: 2.9,
      height: 0.3
    },
    shippingClass: "standard"
  },
  
  // SEO info
  seo: {
    metaTitle: "iPhone 15 Pro - Latest Apple Smartphone",
    metaDescription: "Buy the latest iPhone 15 Pro with advanced features",
    slug: "iphone-15-pro",
    keywords: ["iphone", "apple", "smartphone"]
  },
  
  // Status fields
  status: "ACTIVE", // ACTIVE, INACTIVE, DISCONTINUED, DRAFT
  visibility: "PUBLIC", // PUBLIC, PRIVATE, HIDDEN
  featured: false,
  trending: true,
  recommended: false,
  
  // Timestamps
  created_at: ISODate("2024-01-01T00:00:00Z"),
  updated_at: ISODate("2024-01-01T00:00:00Z"),
  version: 1
}
```

### MongoDB Indexes

```javascript
// Text search index
db.products.createIndex({
  "name": "text",
  "description": "text", 
  "brand": "text",
  "tags": "text"
});

// Performance indexes
db.products.createIndex({ "category": 1, "status": 1, "visibility": 1 });
db.products.createIndex({ "brand": 1, "status": 1, "visibility": 1 });
db.products.createIndex({ "sku": 1 }, { unique: true });
db.products.createIndex({ "featured": 1, "status": 1, "visibility": 1 });
db.products.createIndex({ "trending": 1, "status": 1, "visibility": 1 });
db.products.createIndex({ "recommended": 1, "status": 1, "visibility": 1 });
db.products.createIndex({ "price": 1 });
db.products.createIndex({ "sale_price": 1 });
db.products.createIndex({ "inventory.inStock": 1, "inventory.quantity": 1 });
db.products.createIndex({ "tags": 1 });
db.products.createIndex({ "created_at": -1 });
db.products.createIndex({ "updated_at": -1 });
```

### Sample Data
The database is seeded with 50 products across 5 categories:
- **Electronics** (10): Phones, laptops, gaming consoles, etc.
- **Clothing** (10): Shoes, jeans, jackets, accessories
- **Home & Garden** (10): Kitchen appliances, smart home devices
- **Books** (10): Bestsellers across various genres
- **Sports & Outdoors** (10): Outdoor gear, fitness equipment

---

## 🐘 PostgreSQL - User Database (Planned)

**Database**: `shopster_users`

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    status VARCHAR(20) DEFAULT 'ACTIVE', -- ACTIVE, INACTIVE, SUSPENDED
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### User Addresses Table
```sql
CREATE TABLE user_addresses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL, -- SHIPPING, BILLING, BOTH
    street_address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL,
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### User Sessions Table  
```sql
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL,
    device_info JSONB,
    ip_address INET,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Roles & Permissions Tables
```sql
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL, -- ADMIN, USER, MODERATOR
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) UNIQUE NOT NULL, -- READ_PRODUCTS, WRITE_PRODUCTS, etc.
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE role_permissions (
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE user_roles (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    assigned_at TIMESTAMP DEFAULT NOW(),
    PRIMARY KEY (user_id, role_id)
);
```

---

## 📦 Order Database (Planned)

### Orders Table
```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    order_number VARCHAR(20) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'PENDING', -- PENDING, CONFIRMED, SHIPPED, DELIVERED, CANCELLED
    subtotal DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) NOT NULL,
    shipping_amount DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Shipping address snapshot
    shipping_address JSONB NOT NULL,
    
    -- Payment info  
    payment_method VARCHAR(50),
    payment_status VARCHAR(20) DEFAULT 'PENDING',
    payment_id VARCHAR(255),
    
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

### Order Items Table
```sql
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR(255) NOT NULL, -- MongoDB Product ID
    product_snapshot JSONB NOT NULL, -- Product data at time of order
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🔴 Redis - Cache & Sessions (Planned)

### Session Storage
```
Key: session:{user_id}
Value: {
  "userId": "uuid",
  "email": "user@example.com", 
  "roles": ["USER"],
  "loginTime": "2024-01-01T00:00:00Z"
}
TTL: 24 hours
```

### Shopping Cart Storage
```
Key: cart:{user_id}
Value: {
  "items": [
    {
      "productId": "product-1",
      "quantity": 2,
      "addedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "updatedAt": "2024-01-01T00:00:00Z"
}
TTL: 30 days
```

### Cache Keys
- `products:random:{limit}` - Random products list
- `products:featured:{limit}` - Featured products list  
- `products:category:{category}:{page}` - Category product pages
- `products:search:{query}:{page}` - Search result pages

---

## 🔄 Database Migrations

### MongoDB Migrations
Located in: `apps/product-service/src/main/resources/db/migration/`

### PostgreSQL Migrations  
Using Flyway - Located in: `apps/user-service/src/main/resources/db/migration/`

Example migration:
```sql
-- V1__Create_users_table.sql
CREATE TABLE users (
    -- schema definition
);

-- V2__Add_user_indexes.sql  
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
```

---

## 📊 Database Performance

### MongoDB Performance Tips
- Use compound indexes for multi-field queries
- Limit document size (max 16MB)
- Use projection to return only needed fields
- Implement proper aggregation pipelines

### PostgreSQL Performance Tips  
- Use appropriate indexes on foreign keys
- Implement connection pooling
- Use EXPLAIN ANALYZE for query optimization
- Consider partitioning for large tables

### Redis Performance Tips
- Set appropriate TTL values
- Use Redis Cluster for high availability
- Monitor memory usage
- Use appropriate data structures

---

## 🔧 Database Administration

### Backup Strategy
- **MongoDB**: Daily backups using `mongodump`
- **PostgreSQL**: Daily backups using `pg_dump`
- **Redis**: RDB snapshots + AOF for persistence

### Monitoring
- MongoDB: MongoDB Compass, Atlas monitoring
- PostgreSQL: pgAdmin, CloudWatch metrics
- Redis: Redis CLI, RedisInsight

### Connection Strings
```bash
# Development
MONGODB_URI=mongodb://localhost:27017/shopster_products_dev
POSTGRES_URI=postgresql://localhost:5432/shopster_users
REDIS_URI=redis://localhost:6379

# Production (use environment variables)
MONGODB_URI=${MONGODB_CONNECTION_STRING}
POSTGRES_URI=${POSTGRES_CONNECTION_STRING}  
REDIS_URI=${REDIS_CONNECTION_STRING}
```