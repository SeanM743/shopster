# Technology Stack Specification

This document defines the exact technologies, frameworks, and tools used across the ecommerce platform.

## Frontend Stack

### **Core Framework**
- **React 18+** with TypeScript for type safety and modern patterns
- **Vite** as build tool (migrate from Create React App when needed)
- **React Router v6** for client-side routing

### **UI & Styling**
- **shadcn/ui** with Radix UI primitives for component library
- **Tailwind CSS** for utility-first styling approach
- **CSS-in-JS** (styled-components) when dynamic styling needed

### **State Management**
- **Zustand** for client-side state management
- **TanStack Query (React Query)** for server state and caching
- **React Context** for component-level state sharing

### **Forms & Validation**
- **React Hook Form** for performant form handling
- **Zod** for runtime type validation and form schemas

### **HTTP & API**
- **Axios** with request/response interceptors
- **OpenAPI/Swagger** generated TypeScript clients

### **Development & Quality**
- **TypeScript Strict Mode** for maximum type safety
- **ESLint** with React and TypeScript rules
- **Prettier** for consistent code formatting
- **Vitest + React Testing Library** for unit and integration testing

### **Performance & Optimization**
- **React.memo, useMemo, useCallback** for optimization
- **Code splitting** with React.lazy and Suspense
- **Bundle analyzer** for size monitoring
- **Lighthouse CI** for performance tracking

## Backend Stack

### **Core Framework**
- **Java 17+** as programming language
- **Spring Boot 3.2+** as application framework
- **Maven** for build and dependency management

### **Web & Networking**
- **Spring WebFlux** with **Netty** for reactive HTTP server
- **Spring Security 6+** for authentication and authorization
- **Spring Validation** for input validation with Bean Validation

### **Data & Persistence**
- **Spring Data JPA** for relational data access
- **Spring Data MongoDB** for NoSQL data access
- **HikariCP** for database connection pooling
- **Flyway** for database migration management

### **Development Libraries**
- **Lombok** for boilerplate code reduction
- **Jackson** for JSON serialization/deserialization
- **MapStruct** for object mapping between layers

### **Testing Framework**
- **JUnit 5** for unit testing
- **Mockito** for mocking dependencies
- **TestContainers** for integration testing with real databases
- **Spring Boot Test** for application context testing

### **Documentation & Monitoring**
- **SpringDoc OpenAPI** for API documentation generation
- **Micrometer** with Prometheus for metrics collection
- **Logback** with structured logging patterns

## Database Technologies

### **Relational Database**
- **PostgreSQL 15+** for production workloads
- **H2 Database** for development and testing
- **Connection Pooling**: HikariCP with optimized settings
- **Migration**: Flyway for version-controlled schema changes

### **NoSQL Database**
- **MongoDB 7+** for product catalog and flexible schemas
- **MongoDB Atlas** free tier for development
- **Indexing**: Text search and geospatial indexes

### **Caching (Future)**
- **Redis** for session storage and API response caching
- **Redis Cloud** free tier for development

## Infrastructure & DevOps

### **Containerization**
- **Docker** for application containerization
- **Docker Compose** for local development orchestration
- **Multi-stage builds** for optimized production images

### **Load Balancing**
- **nginx** for reverse proxy and load balancing
- **SSL/TLS termination** at load balancer level
- **Health checks** and automatic failover

### **CI/CD Pipeline**
- **GitHub Actions** for continuous integration and deployment
- **Automated Testing**: Unit, integration, and visual tests
- **Security Scanning**: Vulnerability assessment in pipeline
- **Docker Registry**: Container image management

### **Monitoring & Observability**
- **Prometheus** for metrics collection
- **Grafana** for monitoring dashboards (future)
- **Structured Logging** with correlation IDs
- **Health Check endpoints** for service monitoring

## Development Tools

### **Code Quality**
- **SonarQube** for code quality analysis (future)
- **SpotBugs** for Java static analysis
- **ESLint + Prettier** for JavaScript/TypeScript
- **Git hooks** for pre-commit quality checks

### **Testing Tools**
- **Playwright MCP** for automated browser testing
- **Visual regression testing** with screenshot comparison
- **axe-core** for accessibility testing
- **Lighthouse CI** for performance auditing

### **IDE & Development**
- **VS Code** with recommended extensions
- **IntelliJ IDEA** for Java development
- **Claude Code** with MCP integrations
- **Git** with conventional commit messages

## Version Management

### **Runtime Versions**
```yaml
Java: 17 LTS
Node.js: 18 LTS
npm: 9+
Docker: 24+
PostgreSQL: 15+
MongoDB: 7+
nginx: 1.25+
```

### **Framework Versions**
```yaml
# Frontend
React: 18+
TypeScript: 5+
Vite: 5+
Tailwind CSS: 3+
shadcn/ui: latest

# Backend  
Spring Boot: 3.2+
Spring Security: 6+
Spring Data: 3+
JUnit: 5+
```

### **Development Dependencies**
```yaml
# Frontend
@types/react: latest
@types/node: latest
eslint: 8+
prettier: 3+
vitest: 1+

# Backend
lombok: 1.18+
jackson: 2.15+
mapstruct: 1.5+
testcontainers: 1.19+
```

## Environment Configuration

### **Development Environment**
- **Frontend**: `npm start` on port 3000
- **Backend**: Spring Boot DevTools with hot reload
- **Databases**: Docker Compose with local instances
- **Load Balancer**: nginx configuration for local routing

### **Production Environment**
- **Containerized Deployment** with Docker
- **Environment Variables** for configuration
- **Secrets Management** for sensitive data
- **Health Checks** for service monitoring

This technology stack provides a solid foundation for building a scalable, maintainable ecommerce platform. All choices prioritize developer experience, performance, and long-term maintainability.

For implementation details and patterns, see [Architecture Patterns](architecture-patterns.md).
For coding standards and conventions, see [Development Standards](development-standards.md).