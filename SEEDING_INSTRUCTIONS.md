# Database Seeding Instructions

This guide explains how to seed the product database with 50 mock items.

## What was created

1. **DataSeeder.java** - A Spring Boot CommandLineRunner that automatically seeds the database with 50 diverse products across 5 categories:
   - Electronics (10 products): iPhones, laptops, gaming consoles, etc.
   - Clothing (10 products): Shoes, jeans, jackets, accessories, etc.
   - Home & Garden (10 products): Kitchen appliances, smart home devices, etc.
   - Books (10 products): Bestsellers across fiction, non-fiction, and memoirs
   - Sports & Outdoors (10 products): Outdoor gear, fitness equipment, etc.

2. **Docker Setup** - Complete containerization with:
   - MongoDB database with proper indexes
   - Product service container
   - Database initialization script

3. **Helper Scripts** - Easy-to-use scripts for running the application

## Features of the Mock Data

Each product includes:
- Realistic names, brands, and descriptions
- Proper SKU codes
- Pricing with optional sale prices (discounts)
- Inventory management with stock levels
- Product images (placeholder URLs)
- Tags for categorization and search
- Random ratings and review counts
- Random featured/trending/recommended flags

## Quick Start Options

### Option 1: Docker Compose (Recommended)
```bash
# Start just MongoDB
docker-compose up -d mongodb

# Or start everything (MongoDB + Product Service)
docker-compose up --build
```

### Option 2: Script-based Setup
```bash
# Use the provided script
./seed-products.sh
```

### Option 3: Manual Maven Build
```bash
# Ensure MongoDB is running (via Docker or local install)
docker-compose up -d mongodb

# Build and run the product service
cd apps/product-service
mvn clean package -DskipTests
SPRING_PROFILES_ACTIVE=dev java -jar target/product-service-*.jar
```

## Verification

After running, you can verify the seeding worked by:

1. **Check application health**:
   ```bash
   curl http://localhost:8082/actuator/health
   ```

2. **Check MongoDB directly**:
   ```bash
   docker exec -it shopster-mongodb mongosh
   use shopster_products_dev
   db.products.countDocuments()  # Should return 50
   db.products.find().limit(5)   # Show first 5 products
   ```

3. **API endpoints** (if controllers are implemented):
   - `GET /products` - List all products
   - `GET /products?featured=true` - Get featured products
   - `GET /products/search?q=iPhone` - Search products

## Database Details

- **Database**: `shopster_products_dev`
- **Collection**: `products`
- **Connection**: `mongodb://localhost:27017`
- **Indexes**: Automatically created for search, category, brand, SKU, etc.

## Data Categories and Examples

### Electronics (10 products)
- iPhone 15 Pro, Samsung Galaxy S24, MacBook Pro 14", Dell XPS 13
- iPad Air, Sony WH-1000XM5, AirPods Pro, Nintendo Switch OLED
- PlayStation 5, LG OLED C3 55"

### Clothing (10 products)
- Nike Air Force 1, Levi's 501 Jeans, Adidas Ultraboost 22
- Patagonia Down Jacket, Champion Hoodie, Ray-Ban Aviators
- Uniqlo Heattech, Converse Chuck Taylor, North Face Jacket, Vans Old Skool

### Home & Garden (10 products)
- Dyson V15 Detect, KitchenAid Stand Mixer, Nespresso Vertuo Next
- Instant Pot Duo, Philips Hue Smart Bulbs, iRobot Roomba j7+
- Ninja Foodi Air Fryer, Breville Barista Express, Le Creuset Dutch Oven

### Books (10 products)
- The Psychology of Money, Atomic Habits, Seven Husbands of Evelyn Hugo
- Educated, Where the Crawdads Sing, Dune, The Midnight Library
- Becoming, The Silent Patient, Normal People

### Sports & Outdoors (10 products)
- Yeti Rambler Tumbler, Hydro Flask Water Bottle, Coleman Camping Chair
- REI Trail 25 Backpack, Patagonia Houdini Jacket, Garmin Forerunner 245
- Therm-a-Rest Sleeping Pad, Black Diamond Headlamp, Osprey Atmos AG 65

## Customization

To modify the seed data:

1. Edit `/apps/product-service/src/main/java/com/shopster/product/config/DataSeeder.java`
2. Adjust the `seedProducts()` method
3. Rebuild and run the application

The seeder only runs when the database is empty, so clear the collection to re-seed:
```bash
docker exec -it shopster-mongodb mongosh
use shopster_products_dev
db.products.deleteMany({})
```

## Troubleshooting

1. **"Port 27017 already in use"**: Another MongoDB instance is running
2. **"Connection refused"**: Docker not running or MongoDB container not started
3. **"No products seeded"**: Database already contains products (seeder skips if not empty)
4. **Maven not found**: Install Maven or use Docker approach