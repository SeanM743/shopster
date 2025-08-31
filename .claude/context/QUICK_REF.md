# Quick Reference & Commands

*Essential commands and references for efficient development. Keep this minimal and actionable.*

## 🚀 Start Services
```bash
# Frontend
cd apps/frontend && npm start

# Product Service
cd apps/product-service && mvn spring-boot:run -Dspring.profiles.active=dev

# User Service  
cd apps/user-service && mvn spring-boot:run -Dspring.profiles.active=dev

# Cart Service
cd apps/cart-service && mvn spring-boot:run -Dspring.profiles.active=dev

# Membership Service
cd apps/membership-service && mvn spring-boot:run -Dspring.profiles.active=dev
```

## 🛠 Common Dev Commands
```bash
# Check service status
lsof -i :3000  # Frontend
lsof -i :8082  # Product Service
lsof -i :8083  # User Service

# Database access
mongo shopster_products_dev  # MongoDB
psql -d shopster_users_dev   # PostgreSQL

# Git workflow
git status && git add . && git commit -m "Brief description"
```

## 🔧 Key File Paths
```bash
# Frontend config
apps/frontend/.env                    # Environment variables
apps/frontend/src/services/api.ts     # API configuration

# Backend config  
apps/product-service/src/.../WebConfig.java       # CORS
apps/product-service/application.yml              # Database config
```

## 🎯 API Endpoints (Live)
```bash
# Product Service (8082)
GET /api/v1/products/random?limit=15  # Homepage products
GET /api/v1/products/featured         # Featured products
GET /api/v1/products/{id}             # Single product

# User Service (8083)  
POST /api/v1/auth/login              # User login
POST /api/v1/auth/register           # User registration

# Cart Service (8085)
GET /api/v1/cart                     # Get cart
POST /api/v1/cart/items              # Add item to cart

# Membership Service (8084)
GET /api/membership/plans            # Get all membership plans
GET /api/membership/users/{userId}/status # Check membership status

# Test URLs
http://localhost:3000                # Frontend app
http://localhost:8082/api/v1/products/random?limit=2  # Direct API test
```

## 📊 Service Ports & Status
| Service | Port | Status | Database |
|---------|------|--------|----------|
| Frontend | 3000 | ✅ | - |
| Product | 8082 | ✅ | MongoDB |
| User | 8083 | ✅ | PostgreSQL |
| Cart | 8085 | ⏸️ | Redis |
| Membership | 8084 | ✅ | PostgreSQL |

## 🚨 Common Issues & Fixes
```bash
# CORS errors → Check .env file and restart frontend
# Products not loading → Verify Product Service is running on 8082
# Auth state issues → Check AuthContext in Header component
# Database connection → Verify Docker containers are running
```

## 📱 Visual Testing
```bash
# Use Playwright MCP for testing
# Navigate to pages and take screenshots
# Test responsive design (375px, 1920px)
# Verify component states (loading, error, success)
```

---
*Keep this file under 100 lines for quick reference. Details in MASTER.md*