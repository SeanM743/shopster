# Shopster Ecommerce Platform

A modern, full-stack ecommerce platform built with microservices architecture, featuring React frontend, Spring Boot backend services, and MongoDB database.

## 🏗️ Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│                 │    │                  │    │                 │
│   React Frontend│◄──►│ BFF Orchestration│◄──►│ Product Service │
│   (Port 3000)   │    │   (Port 8081)    │    │   (Port 8082)   │
│                 │    │                  │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │                         │
                                │                         │
                                ▼                         ▼
                       ┌──────────────────┐    ┌─────────────────┐
                       │                  │    │                 │
                       │  User Service    │    │   MongoDB       │
                       │  (Port 8083)     │    │  (Port 27017)   │
                       │                  │    │                 │
                       └──────────────────┘    └─────────────────┘
```

## 📁 Project Structure

```
shopster-ecommerce/
├── apps/
│   ├── frontend/              # React + TypeScript + TailwindCSS
│   ├── bff-orchestration/     # Spring Boot BFF Layer
│   ├── product-service/       # Spring Boot + MongoDB
│   └── user-service/          # Spring Boot + PostgreSQL
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
   
   # Start BFF Service
   cd apps/bff-orchestration
   mvn spring-boot:run -Dspring-boot.run.profiles=dev
   
   # Start Frontend
   cd apps/frontend
   npm install && npm start
   ```

### Access Points
- **Frontend**: http://localhost:3000
- **BFF API**: http://localhost:8081
- **Product Service**: http://localhost:8082
- **MongoDB**: mongodb://localhost:27017

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
- **Responsive Design**: Mobile-first approach
- **Circuit Breakers**: Resilient service communication
- **Caching**: Multi-level caching strategy
- **Health Monitoring**: Actuator endpoints

### 🔄 In Progress
- **User Authentication**: JWT-based auth system
- **Shopping Cart**: Persistent cart with Redis
- **Payment Integration**: Stripe/PayPal integration
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