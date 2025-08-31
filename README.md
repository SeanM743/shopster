# Shopster Ecommerce Platform

A modern, full-stack ecommerce platform built with a microservices architecture, featuring a React TypeScript frontend and Spring Boot backend services.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Application Load Balancer               │
│                        (nginx/HAProxy)                     │
└─────────────────┬───────────────────┬─────────────────────┘
                  │                   │
        ┌─────────▼──────────┐ ┌──────▼──────────┐
        │   React Frontend   │ │   Backend Services│
        │   (Port 3000)      │ │  (Spring Boot)  │
        └────────────────────┘ └─────────┬───────┘
                                         │
        ┌────────────────────────────────┼────────────────────┐
        │                               │                    │
┌───────▼────────┐              ┌──────▼──────┐    ┌────────▼────────┐
│  User Service  │              │Product Service│    │Membership Service│
│  (Auth/Users)  │              │ (Products)  │    │   (Future)      │
└───────┬────────┘              └──────┬──────┘    └─────────────────┘
        │                              │
┌───────▼────────┐              ┌──────▼──────┐
│  PostgreSQL    │              │  MongoDB    │
│  (User Data)   │              │ (Products)  │
└────────────────┘              └─────────────┘
```

## 📁 Project Structure

```
ecommerce/
├── apps/
│   ├── frontend/              # React + TypeScript + TailwindCSS
│   ├── api-gateway/           # Spring Boot API Gateway (Future)
│   ├── cart-service/          # Spring Boot + Redis (Shopping Cart)
│   ├── membership-service/    # Spring Boot + PostgreSQL (Shopster+ Subscriptions)
│   ├── product-service/       # Spring Boot + MongoDB (Product Catalog)
│   └── user-service/          # Spring Boot + PostgreSQL (Authentication & User Management)
├── .claude/                   # Claude/Gemini context and documentation
├── docs/                      # General project documentation
├── infrastructure/            # Docker & deployment configurations
├── packages/                  # Shared libraries (e.g., api-client, shared-types)
└── tests/                     # End-to-end tests
```

## 🚀 Quick Start

### Prerequisites
- **Java**: JDK 21+
- **Node.js**: 18+
- **npm**: 9+
- **Maven**: 3.9+
- **Docker** & **Docker Compose**: Latest versions
- **MongoDB**: 7.0+ (can be run via Docker)
- **PostgreSQL**: 15+ (can be run via Docker)
- **Redis**: 7+ (can be run via Docker)

### Development Setup

1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd shopster-ecommerce
    ```

2.  **Start all services with Docker Compose (Recommended)**:
    This will build and run all microservices, databases (MongoDB, PostgreSQL, Redis), and the frontend application.
    ```bash
    docker-compose up --build -d
    ```
    *   To view logs: `docker-compose logs -f`
    *   To stop services: `docker-compose down`

3.  **Or start services manually**:

    *   **Start Databases (via Docker)**:
        ```bash
        docker-compose up -d mongodb postgres redis
        ```

    *   **Start Backend Services**:
        (Open a new terminal for each service)
        ```bash
        # Product Service
        cd apps/product-service && mvn spring-boot:run -Dspring.profiles.active=dev

        # User Service
        cd apps/user-service && mvn spring-boot:run -Dspring.profiles.active=dev

        # Cart Service
        cd apps/cart-service && mvn spring-boot:run -Dspring.profiles.active=dev

        # Membership Service
        cd apps/membership-service && mvn spring-boot:run -Dspring.profiles.active=dev
        ```

    *   **Start Frontend**:
        ```bash
        cd apps/frontend
        npm install
        npm start
        ```

### Access Points

-   **Frontend Application**: `http://localhost:3000`
-   **Product Service API**: `http://localhost:8082`
-   **User Service API**: `http://localhost:8083`
-   **Membership Service API**: `http://localhost:8084`
-   **Cart Service API**: `http://localhost:8085`
-   **MongoDB**: `mongodb://localhost:27017`
-   **PostgreSQL**: `localhost:5432`
-   **Redis**: `localhost:6379`

## 🛠️ Technology Stack

### Frontend
-   **React 18+** - UI Library
-   **TypeScript 5+** - Type Safety
-   **Tailwind CSS 3+** - Styling
-   **shadcn/ui** - Component Library
-   **TanStack Query** - Server State Management & Caching
-   **Zustand** - Client-side State Management
-   **React Router v6** - Client-side Routing
-   **Axios** - HTTP Client

### Backend
-   **Spring Boot 3.2+** - Application Framework
-   **Java 21+** - Programming Language
-   **Maven** - Build Tool
-   **Spring WebFlux** - Reactive Web Framework
-   **Spring Security 6+** - Authentication & Authorization
-   **Spring Data JPA** - Relational Data Access
-   **Spring Data MongoDB** - NoSQL Data Access
-   **Lombok, Jackson, MapStruct** - Development Libraries
-   **Resilience4j** - Circuit Breaker

### Databases
-   **MongoDB 7+** - Product Catalog
-   **PostgreSQL 15+** - User & Membership Data
-   **Redis 7+** - Session Storage & Cart Management

### DevOps & Tools
-   **Docker** - Containerization
-   **Docker Compose** - Local Development Orchestration
-   **GitHub Actions** - CI/CD Pipeline
-   **Kubernetes** - Production Deployment
-   **Prometheus, Grafana** - Monitoring & Observability
-   **Playwright MCP** - Visual Testing
-   **JUnit 5, Mockito, TestContainers** - Backend Testing
-   **Vitest, React Testing Library** - Frontend Testing

## 📊 Features

### ✅ Implemented
-   **Product Catalog**: 50 seeded products across 5 categories with a 5x3 responsive grid.
-   **Search & Filter**: MongoDB text search with aggregation.
-   **User Authentication**: JWT-based login, logout, and signup with proper navigation integration.
-   **Shopping Cart**: Persistent cart with Redis, including add/remove items, quantity updates, and price calculations.
-   **Shopster+ Membership**: Complete subscription management system with monthly/annual plans, 7-day free trials, and stubbed payment integration.
-   **Customer Lookup**: Admin interface for subscription management.
-   **Responsive Design**: Mobile-first approach using Tailwind CSS.
-   **Real Backend Services**: All services running with MongoDB, PostgreSQL, and Redis.
-   **Navigation**: Proper authentication state management.
-   **CORS Configuration**: Correctly configured for local development.
-   **API Debugging**: Enhanced with Axios interceptors.
-   **Circuit Breakers**: Resilient service communication using Resilience4j.
-   **Caching**: Multi-level caching strategy (Redis, React Query).
-   **Health Monitoring**: Actuator endpoints for all services.

### 🔄 In Progress
-   **Order Management**: Complete order workflow (creation, tracking, history).

### 📋 Planned
-   **Reviews & Ratings**: User review system for products.
-   **Inventory Management**: Advanced stock tracking and alerts.
-   **Admin Dashboard**: Comprehensive UI for product and order management.
-   **Mobile App**: React Native implementation.
-   **Advanced Features**: Product recommendations, personalized experiences.
-   **Message Queues**: For asynchronous processing (e.g., order fulfillment).
-   **Service Mesh**: For advanced traffic management and security.
-   **Observability**: Deeper tracing and logging.
-   **API Gateway**: Centralized routing, rate limiting, and API management.

## 📚 Documentation Links

-   [**Master Context**](.claude/context/MASTER.md): Essential application overview, tech stack, architecture, current status.
-   [**Session Log**](.claude/context/SESSION.md): Running log of all development sessions and changes.
-   [**Quick Reference**](.claude/context/QUICK_REF.md): Commands, endpoints, common fixes, and development shortcuts.
-   [**API Documentation**](docs/API.md): Detailed API endpoints for all services.
-   [**Database Schema**](docs/DATABASE.md): Comprehensive database schemas and configurations.
-   [**Deployment Guide**](docs/DEPLOYMENT.md): Strategies for Docker Compose, Kubernetes, and Cloud platforms.
-   [**Infrastructure Guide**](docs/INFRASTRUCTURE.md): Service discovery, multi-host, load balancing, and MCP integration.
-   [**Rate Limiting Guide**](docs/RATE_LIMITING.md): Implementation details for API rate limiting.
-   [**Security Guide**](docs/SECURITY.md): Authentication, encryption, and security best practices.
-   [**Architecture Patterns**](.claude/context/archive/architecture-patterns.md): Design patterns and principles.
-   [**Brand Context**](.claude/context/archive/brand-context.md): Brand identity, visual design, and UX guidelines.
-   [**Development Standards**](.claude/context/archive/development-standards.md): Coding standards, naming conventions, and quality requirements.
-   [**Technology Stack Specification**](.claude/context/archive/technology-stack.md): Exact technologies, frameworks, and tools used.
-   [**Visual Testing Workflow**](.claude/context/archive/visual-testing-workflow.md): Mandatory visual testing process for frontend changes.

## 🤝 Contributing

1.  Fork the repository.
2.  Create a feature branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes and ensure they adhere to [Development Standards](.claude/context/archive/development-standards.md).
4.  Add/update tests and ensure all tests pass.
5.  Commit your changes with a descriptive message following conventional commits.
6.  Push your branch and submit a pull request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

-   **Issues**: [GitHub Issues](https://github.com/SeanM743/shopster/issues)
-   **Discussions**: [GitHub Discussions](https://github.com/SeanM743/shopster/discussions)
-   **Documentation**: Refer to the `docs/` folder and `.claude/context/` for comprehensive guides.

---

Built with ❤️ using modern web technologies.
