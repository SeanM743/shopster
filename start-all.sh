#!/bin/bash
echo "🚀 Starting all Shopster services..."
docker-compose up -d --build
echo "✅ All services are starting up in the background."
echo "ℹ️ Use 'docker-compose logs -f [service-name]' to see the logs."
