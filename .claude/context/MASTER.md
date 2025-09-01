# Shopster Ecommerce Platform - Master Context

## 🚀 Application Overview
**Shopster** is a modern ecommerce platform built with React TypeScript frontend and Spring Boot microservices.

### Current Architecture (LIVE)
```
React Frontend (3000) → API Gateway (8080) → Product Service (8082) → MongoDB
                                          ↘  User Service (8081) → PostgreSQL  
                                          ↘  Cart Service (8085) → Redis
                                          ↘  Membership Service (8084) → PostgreSQL
```

### Live Services Status
- ✅ **Frontend**: React app on localhost:3000 (with auth, product grid, membership pages)
- ✅ **API Gateway**: Spring Cloud Gateway on localhost:8080 (routing to microservices)
- ✅ **Product Service**: Spring Boot on localhost:8082 (MongoDB integrated, 15 products in grid)
- ✅ **User Service**: Authentication & user management on localhost:8081
- ✅ **Cart Service**: Shopping cart with Redis on localhost:8085
- ✅ **Membership Service**: Shopster+ subscriptions on localhost:8084
- ✅ **MongoDB**: Product catalog with real data
- ✅ **Redis**: Cart persistence
- ✅ **PostgreSQL**: User and membership data
- ✅ **Monitoring**: Prometheus (9090), Grafana (3001), Custom Dashboard (3002)

## 🛠 Tech Stack (Production)
| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Frontend | React 18+ + TypeScript 5+ | - | UI/UX |
| Styling | Tailwind CSS 3+ + shadcn/ui | - | Design system |
| State | Zustand + TanStack Query | - | Client & Server State |
| Backend | Spring Boot 3.2+ + Java 17+ | - | Microservices |
| Auth | Spring Security 6+ + JWT | - | Authentication |
| Data | MongoDB 7+ + PostgreSQL 15+ + Redis 7+ | - | Persistence |
| Build | Maven + npm | - | Build tools |
| Deploy | Docker + nginx | - | Infrastructure |

## 📂 Project Structure
```
apps/
├── frontend/           # React TypeScript app
│   ├── src/components/ # Reusable UI (Header, ProductCard, ProductGrid)
│   ├── src/pages/      # Routes (TestHomePage, CartPage, ShopsterPlusPage)
│   ├── src/contexts/   # AuthContext for login state
│   └── src/services/   # API calls (productApi, userApi)
├── product-service/    # Product catalog (Java/Spring Boot)
├── user-service/       # Authentication (Java/Spring Boot)
├── cart-service/       # Shopping cart (Java/Spring Boot)
├── membership-service/ # Shopster+ subscriptions (Java/Spring Boot)
└── bff-orchestration/ # API gateway (Future)
```

## 🔧 Key Implementation Patterns
- **Repository Pattern**: Spring Data JPA/MongoDB repositories
- **DTO Pattern**: Request/response objects with validation
- **Service Layer**: Business logic in @Service classes
- **React Hooks**: Custom hooks for auth, API calls, local storage
- **Context Pattern**: React Context for global state (AuthContext)
- **Component Composition**: Reusable UI components with proper TypeScript

## 🚨 Critical Configuration
```bash
# Frontend Environment (.env)
REACT_APP_BFF_URL=http://localhost:8082  # Direct to Product Service

# Backend Database Profiles
spring.profiles.active=dev              # Uses local MongoDB/PostgreSQL
```

## 🔄 Development Workflow
1. **Frontend**: `npm start` on port 3000
2. **Services**: `mvn spring-boot:run -Dspring.profiles.active=dev`
3. **Testing**: Visual testing with Playwright MCP
4. **Database**: Local MongoDB + PostgreSQL + Redis via Docker
5. **API**: RESTful endpoints with OpenAPI docs

## 🛡 Security Standards
- JWT authentication with Spring Security
- Input validation with @Valid annotations
- CORS configured for localhost development
- Password hashing with BCrypt (12 rounds)
- Environment variables for secrets

## 📊 Current Features (IMPLEMENTED)
- ✅ Product catalog with 15-item grid (5x3 layout)
- ✅ Search & Filter (MongoDB text search)
- ✅ User authentication (login/logout/signup)
- ✅ Shopping cart with Redis persistence
- ✅ Shopster+ membership subscriptions ($9.99/month, $95.99/year)
- ✅ Customer Lookup (Admin interface)
- ✅ Free Trials (7-day free trials)
- ✅ Payment Integration (stubbed)
- ✅ Responsive design with Tailwind CSS
- ✅ Real backend services with MongoDB/PostgreSQL/Redis
- ✅ Navigation with proper auth state management
- ✅ CORS configuration and API debugging
- ✅ Circuit Breakers (Resilience4j)
- ✅ Caching (Redis, React Query)
- ✅ Health Monitoring (Actuator endpoints)

---
*This master context provides essential information for development. See SESSION.md for recent changes and QUICK_REF.md for common commands.*
