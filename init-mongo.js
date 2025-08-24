// MongoDB initialization script
db = db.getSiblingDB('shopster_products_dev');

// Create the products collection with proper indexes
db.createCollection('products');

// Create text indexes for search functionality
db.products.createIndex({
    "name": "text",
    "description": "text",
    "brand": "text",
    "tags": "text"
});

// Create compound indexes for common queries
db.products.createIndex({ "category": 1, "status": 1, "visibility": 1 });
db.products.createIndex({ "brand": 1, "status": 1, "visibility": 1 });
db.products.createIndex({ "sku": 1 }, { unique: true });
db.products.createIndex({ "featured": 1, "status": 1, "visibility": 1 });
db.products.createIndex({ "trending": 1, "status": 1, "visibility": 1 });
db.products.createIndex({ "recommended": 1, "status": 1, "visibility": 1 });
db.products.createIndex({ "price": 1 });
db.products.createIndex({ "salePrice": 1 });
db.products.createIndex({ "inventory.inStock": 1, "inventory.quantity": 1 });
db.products.createIndex({ "tags": 1 });
db.products.createIndex({ "createdAt": -1 });
db.products.createIndex({ "updatedAt": -1 });

print('MongoDB indexes created successfully for shopster_products_dev database');