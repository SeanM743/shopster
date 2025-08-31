# Shopster Ecommerce Platform

A modern, full-stack ecommerce platform built with microservices architecture, featuring React frontend, Spring Boot backend services, and MongoDB database.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │
│   React Frontend│◄──►│ API Gateway     │
│   (Port 3000)   │    │   (Port 8080)   │
│                 │    │                 │
└─────────────────┘    └──────────┬───────┘
                                  │
                                  ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│ Product Service │    │ User Service    │    │ Membership Svc  │
│   (Port 8082)   │    │  (Port 8083)    │    │  (Port 8084)    │
│                 │    │                 │    │                 │
└──────────┬──────┘    └──────────┬──────┘    └──────────┬──────┘
           │                      │                      │
           ▼                      ▼                      ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│                 │    │                 │    │                 │
│   MongoDB       │    │  PostgreSQL     │    │  PostgreSQL     │
│  (Port 27017)   │    │    (Users)      │    │ (Membership)    │
│                 │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📁 Project Structure

```
shopster-ecommerce/
├── apps/
│   ├── frontend/              # React + TypeScript + TailwindCSS

│   ├── product-service/       # Spring Boot + MongoDB
│   ├── user-service/          # Spring Boot + PostgreSQL
│   ├── membership-service/    # Spring Boot + PostgreSQL (Shopster+)
│   └── cart-service/          # Spring Boot + Redis
├── docs/                      # Documentation
├── infrastructure/            # Docker & deployment configs
├── packages/                  # Shared libraries
└── tools/                     # Development scripts
```

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Node.js 18+
- Maven 3.9+
- Docker & Docker Compose
- MongoDB 7.0+

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd shopster-ecommerce
   ```

2. **Start with Docker (Recommended)**
   ```bash
   docker-compose up --build
   ```

3. **Or start manually**
   ```bash
   # Start MongoDB
   docker-compose up -d mongodb
   
   # Start Product Service
   cd apps/product-service
   mvn spring-boot:run -Dspring-boot.run.profiles=dev
   
   # Start User Service
   cd apps/user-service
   mvn spring-boot:run -Dspring-boot.run.profiles=dev
   
   # Start Membership Service
   cd apps/membership-service
   mvn spring-boot:run -Dspring-boot.run.profiles=dev
   
   
   
   # Start Frontend
   cd apps/frontend
   npm install && npm start
   ```

### Access Points
- **Frontend**: http://localhost:3000
- **Shopster+ Admin**: http://localhost:3000/admin/customers

- **Product Service**: http://localhost:8082
- **User Service**: http://localhost:8083
- **Membership Service**: http://localhost:8084
- **Cart Service**: http://localhost:8085
- **MongoDB**: mongodb://localhost:27017
- **PostgreSQL**: localhost:5432

## 🛠️ Technology Stack

### Frontend
- **React 19** - UI Library
- **TypeScript** - Type Safety
- **TailwindCSS** - Styling
- **React Query** - Data Fetching
- **Zustand** - State Management

### Backend
- **Spring Boot 3.2** - Application Framework
- **Java 17** - Programming Language
- **Maven** - Build Tool
- **MongoDB** - Product Database
- **PostgreSQL** - User Database (planned)

### DevOps & Tools
- **Docker** - Containerization
- **Docker Compose** - Local Development
- **GitHub Actions** - CI/CD (planned)
- **Kubernetes** - Production Deployment (planned)

## 📊 Features

### ✅ Implemented
- **Product Catalog**: 50 seeded products across 5 categories
- **Product Grid**: 5x3 responsive layout
- **Real Images**: Professional product photography via Unsplash CDN
- **Search & Filter**: MongoDB text search with aggregation
- **Shopster+ Membership**: Complete subscription management system
- **Customer Lookup**: Admin interface for subscription management
- **Free Trials**: 7-day free trials for all membership plans
- **Payment Integration**: Multiple payment method support
- **Responsive Design**: Mobile-first approach
- **Circuit Breakers**: Resilient service communication
- **Caching**: Multi-level caching strategy
- **Health Monitoring**: Actuator endpoints

### 🔄 In Progress
- **User Authentication**: JWT-based auth system
- **Shopping Cart**: Persistent cart with Redis
- **Order Management**: Complete order workflow

### 📋 Planned
- **Reviews & Ratings**: User review system
- **Inventory Management**: Stock tracking
- **Admin Dashboard**: Product management UI
- **Analytics**: Usage and sales metrics

## 📚 Documentation Links

- [API Documentation](./API.md)
- [Database Schema](./DATABASE.md)
- [Deployment Guide](./DEPLOYMENT.md)
- [Development Setup](./DEVELOPMENT.md)
- [Architecture Deep Dive](./ARCHITECTURE.md)
- [Testing Guide](./TESTING.md)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see [LICENSE](../LICENSE) for details.

## 📞 Support

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Documentation**: `/docs` folder
- **API Docs**: Available at runtime on each service

---

Built with ❤️ using modern web technologies.