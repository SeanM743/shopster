#!/bin/bash

echo "Starting Shopster Product Service with Database Seeding..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if MongoDB is already running
if docker ps | grep -q shopster-mongodb; then
    echo "MongoDB container is already running."
else
    echo "Starting MongoDB..."
    docker-compose up -d mongodb
    
    # Wait for MongoDB to be ready
    echo "Waiting for MongoDB to be ready..."
    sleep 10
fi

# Check if we can connect to MongoDB
until docker exec shopster-mongodb mongosh --eval "print('MongoDB is ready')" > /dev/null 2>&1; do
    echo "Waiting for MongoDB connection..."
    sleep 2
done

echo "MongoDB is ready!"

# Build and run the product service (this will trigger the DataSeeder)
echo "Building and starting Product Service..."
cd apps/product-service

# Build the project
echo "Building Maven project..."
if command -v mvn > /dev/null; then
    mvn clean package -DskipTests
else
    echo "Maven not found. Please install Maven or use the Docker approach."
    echo "You can run: docker-compose up --build product-service"
    exit 1
fi

# Run the application with dev profile to trigger data seeding
echo "Starting Product Service with data seeding..."
SPRING_PROFILES_ACTIVE=dev java -jar target/product-service-*.jar

echo "Product Service started! The database should now contain 50 mock products."
echo "You can verify by checking: http://localhost:8082/actuator/health"