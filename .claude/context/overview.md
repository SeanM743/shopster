# Ecommerce Platform Overview

## Project Mission

Build a scalable, maintainable ecommerce platform with separate frontend and backend services, designed for modern web standards and microservices architecture.

## Core Architecture Approach

### **Microservices Architecture**
- Each service is independently deployable and maintainable
- Clear service boundaries based on business domains
- Standardized communication patterns between services

### **Domain-Driven Design (DDD)**
- Services organized around business domains
- Clear bounded contexts for each service
- Consistent ubiquitous language across teams

### **Clean Architecture**
- Clear separation of concerns with dependency inversion
- Business logic isolated from infrastructure concerns
- Testable and maintainable code structure

### **API-First Design**
- RESTful APIs with OpenAPI/Swagger documentation
- Consistent API contracts across all services
- Frontend and backend developed independently

## Service Boundaries

### **Frontend - React Application**
- **Technology**: React 18+ with TypeScript, shadcn/ui, Tailwind CSS
- **Port**: 3000 (development)
- **Responsibilities**: User interface, user experience, client-side state management
- **Pages**: Homepage, product detail, cart, checkout, user account

### **Backend for Frontend (BFF) - Spring MVC Orchestration**
- **Technology**: Spring Boot 3.2+ with Spring MVC
- **Port**: 8080
- **Pattern**: Backend for Frontend (BFF) orchestration layer
- **Responsibilities**: 
  - API gateway for frontend requests
  - Data aggregation from multiple backend services
  - Response transformation and caching
  - Authentication orchestration
- **Key Controllers**: HomepageController, ProductController, UserController

### **Data Provider Services**

#### **User Management Service (User Store)**
- **Domain**: Customer authentication, authorization, profile management
- **Database**: PostgreSQL (production), H2 (testing)
- **Port**: 8081
- **Responsibilities**: Login, registration, JWT management, user profiles
- **Key Entities**: User, Role, Session, Profile

#### **Product Service (Product Store)**
- **Domain**: Product catalog, inventory, pricing, search
- **Database**: MongoDB (document-based for flexible product schemas)
- **Port**: 8082
- **Responsibilities**: Product CRUD, inventory tracking, catalog search
- **Key Entities**: Product, Category, Inventory, Pricing

#### **Membership Service** (Future)
- **Domain**: Customer loyalty programs, benefits, discounts
- **Database**: PostgreSQL (relational for complex discount rules)
- **Port**: 8083
- **Responsibilities**: Membership tiers, benefit calculations, discount application
- **Key Entities**: Member, Membership, Benefit, Discount

### **Service Communication Pattern**
```
React Frontend (3000)
    ↓ HTTP/REST API
Spring MVC Orchestration (8080)
    ├─→ User Store Service (8081)
    ├─→ Product Store Service (8082)
    └─→ Membership Service (8083) [Future]
```

## Technology Philosophy

### **Backend Principles**
- **Java-First**: All backend services use Java with Spring Boot
- **Convention over Configuration**: Leverage Spring Boot defaults
- **Security by Design**: Authentication, authorization, and input validation built-in
- **Performance Conscious**: Optimized database queries, connection pooling, caching

### **Frontend Principles**
- **React with TypeScript**: Type safety and modern component patterns
- **Design System First**: shadcn/ui components with Tailwind CSS
- **Responsive by Default**: Mobile-first design approach
- **Accessibility Built-In**: WCAG compliance from the start

### **Integration Principles**
- **Single Load Balancer**: nginx routing to all services
- **Standardized APIs**: Consistent REST patterns and error handling
- **Visual Testing**: Automated screenshot testing for UI changes
- **DevOps Ready**: Docker containers with CI/CD pipelines

## Development Workflow

### **Feature Development Flow**
1. **Architecture Review**: Validate approach against patterns
2. **Implementation**: Follow technology stack and standards
3. **Testing**: Unit, integration, and visual testing
4. **Code Review**: Automated and manual review processes
5. **Deployment**: Containerized deployment through CI/CD

### **Quality Gates**
- **Code Quality**: Automated linting, formatting, and analysis
- **Security**: Vulnerability scanning and secure coding practices
- **Performance**: Load testing and optimization validation
- **Visual Consistency**: Screenshot testing and design compliance

## Scaling Strategy

### **Horizontal Scaling**
- Stateless service design for easy replication
- Database read replicas and connection pooling
- Load balancer distribution across service instances

### **Performance Optimization**
- **Caching**: Redis for session and API response caching
- **CDN**: Static asset delivery optimization
- **Database**: Indexing strategy and query optimization
- **Frontend**: Code splitting, lazy loading, bundle optimization

### **Future Enhancements**
- **Message Queues**: RabbitMQ/Kafka for asynchronous processing
- **Service Mesh**: Istio for advanced service-to-service communication
- **Observability**: Comprehensive monitoring, logging, and tracing
- **API Gateway**: Advanced routing, rate limiting, and API management

This overview provides the foundation for all development decisions and ensures consistency across the platform. For detailed specifications, refer to the specific context files in this directory.