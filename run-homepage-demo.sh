#!/bin/bash

echo "🚀 Starting Shopster Homepage Demo with 15 Random Products"
echo "=========================================================="

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

echo "🐳 Starting MongoDB..."
docker-compose up -d mongodb

# Wait for MongoDB to be ready
echo "⏳ Waiting for MongoDB to be ready..."
until docker exec shopster-mongodb mongosh --eval "print('MongoDB is ready')" > /dev/null 2>&1; do
    echo "   Still waiting for MongoDB..."
    sleep 2
done
echo "✅ MongoDB is ready!"

echo ""
echo "🏭 Building and starting Product Service..."
docker-compose up -d --build product-service

# Wait for product service to be ready and seeded
echo "⏳ Waiting for Product Service to seed data..."
sleep 15

# Check if products were seeded
echo "🔍 Checking if products were seeded..."
until docker logs shopster-product-service | grep -q "Successfully seeded.*products"; do
    echo "   Still waiting for data seeding..."
    sleep 3
done
echo "✅ Product Service is ready with seeded data!"

echo ""
echo "🔗 Building and starting BFF Orchestration Service..."
docker-compose up -d --build bff-orchestration

# Wait for BFF to be ready
echo "⏳ Waiting for BFF Service..."
sleep 15

echo ""
echo "🎨 Building and starting Frontend..."
docker-compose up -d --build frontend

# Wait for frontend to be ready
echo "⏳ Waiting for Frontend to build..."
sleep 20

echo ""
echo "🎉 All services are starting up!"
echo ""
echo "📊 Service Status:"
echo "==================="
echo "🗃️  MongoDB:        http://localhost:27017"
echo "🛍️  Product Service: http://localhost:8082"
echo "🔗 BFF Service:     http://localhost:8081"
echo "🎨 Frontend:        http://localhost:3000"
echo ""

echo "🧪 Testing the API endpoints..."
echo "================================"

# Test MongoDB connection
echo "📊 Testing MongoDB..."
MONGO_COUNT=$(docker exec shopster-mongodb mongosh --quiet --eval "db = db.getSiblingDB('shopster_products_dev'); db.products.countDocuments()")
if [ "$MONGO_COUNT" -gt 0 ]; then
    echo "   ✅ MongoDB has $MONGO_COUNT products"
else
    echo "   ❌ MongoDB appears to be empty"
fi

# Test Product Service
echo "🛍️  Testing Product Service..."
sleep 5
if curl -s http://localhost:8082/actuator/health | grep -q "UP"; then
    echo "   ✅ Product Service is healthy"
    
    # Test random products endpoint
    RANDOM_PRODUCTS=$(curl -s http://localhost:8082/api/v1/products/random?limit=15 | jq '. | length' 2>/dev/null || echo "0")
    if [ "$RANDOM_PRODUCTS" -eq 15 ]; then
        echo "   ✅ Random products endpoint returns 15 products"
    else
        echo "   ⚠️  Random products endpoint returned $RANDOM_PRODUCTS products"
    fi
else
    echo "   ❌ Product Service health check failed"
fi

# Test BFF Service
echo "🔗 Testing BFF Service..."
sleep 5
if curl -s http://localhost:8081/api/v1/homepage/product-carousel/random?limit=15 | grep -q "success"; then
    echo "   ✅ BFF Service random products endpoint is working"
else
    echo "   ❌ BFF Service endpoint test failed"
fi

# Test Frontend
echo "🎨 Testing Frontend..."
if curl -s http://localhost:3000 | grep -q "Shopster"; then
    echo "   ✅ Frontend is serving content"
else
    echo "   ⚠️  Frontend may still be building..."
fi

echo ""
echo "🎯 DEMO READY!"
echo "=============="
echo "Open your browser and visit: http://localhost:3000"
echo ""
echo "You should see:"
echo "• A beautiful homepage with header and hero section"
echo "• 15 random products displayed in a 5x3 grid (5 products per row)"
echo "• Product cards with images, names, brands, prices, and ratings"
echo "• Responsive design that works on different screen sizes"
echo ""
echo "🔍 To verify the data:"
echo "• Products API: http://localhost:8082/api/v1/products/random?limit=15"
echo "• BFF API: http://localhost:8081/api/v1/homepage/product-carousel/random?limit=15"
echo "• MongoDB: docker exec -it shopster-mongodb mongosh"
echo ""
echo "🛑 To stop all services:"
echo "docker-compose down"
echo ""
echo "📋 Service logs:"
echo "docker-compose logs -f [service-name]"