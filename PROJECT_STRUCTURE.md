# Shopster Ecommerce Platform - Project Structure

This document defines the complete project structure following microservices architecture and best practices for separation of concerns.

## Current Structure Overview

```
shopster-ecommerce/
├── .claude/                           # Claude Code context and documentation
│   ├── context/                       # Development context files
│   ├── specs/                         # Service specifications
│   ├── agents/                        # Specialized agent definitions
│   └── frontend_screenshot_testing/   # Visual testing artifacts
├── .env.template                      # Environment configuration template
├── .gitignore                        # Git ignore patterns
├── README.md                         # Project overview
├── docker-compose.yml                # Development environment orchestration
├── docker-compose.prod.yml           # Production environment orchestration
├── apps/                             # Application services
│   ├── frontend/                     # React frontend application
│   ├── bff-orchestration/            # Backend for Frontend layer
│   ├── user-service/                 # User management microservice
│   ├── product-service/              # Product catalog microservice
│   └── membership-service/           # Membership program service (future)
├── packages/                         # Shared libraries and utilities
│   ├── shared-types/                 # TypeScript type definitions
│   ├── shared-utils/                 # Common utility functions
│   └── api-client/                   # Shared API client library
├── infrastructure/                   # Infrastructure as code
│   ├── docker/                       # Docker configurations
│   ├── kubernetes/                   # K8s manifests (future)
│   ├── nginx/                        # Load balancer configuration
│   └── monitoring/                   # Monitoring and observability
├── tools/                            # Development tools and scripts
│   ├── scripts/                      # Build and deployment scripts
│   ├── generators/                   # Code generation tools
│   └── migration/                    # Database migration tools
├── docs/                            # Additional documentation
│   ├── api/                         # API documentation
│   ├── architecture/                # Architecture diagrams
│   └── deployment/                  # Deployment guides
└── tests/                           # End-to-end and integration tests
    ├── e2e/                         # End-to-end tests with Playwright
    ├── integration/                 # Cross-service integration tests
    └── performance/                 # Performance and load tests
```

## Detailed Directory Structure

### **Applications (`/apps/`)**

#### **Frontend Application (`/apps/frontend/`)**
```
frontend/
├── public/                          # Static assets
│   ├── favicon.ico
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
├── src/
│   ├── components/                  # React components
│   │   ├── ui/                     # Base UI components (shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── index.ts
│   │   ├── layout/                 # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── index.ts
│   │   ├── features/               # Feature-specific components
│   │   │   ├── hero-banner/
│   │   │   │   ├── HeroBanner.tsx
│   │   │   │   ├── HeroCard.tsx
│   │   │   │   └── index.ts
│   │   │   ├── product-carousel/
│   │   │   │   ├── ProductCarousel.tsx
│   │   │   │   ├── ProductCard.tsx
│   │   │   │   └── index.ts
│   │   │   ├── product-detail/
│   │   │   │   ├── ProductGallery.tsx
│   │   │   │   ├── BuyBox.tsx
│   │   │   │   ├── ProductTabs.tsx
│   │   │   │   └── index.ts
│   │   │   └── common/
│   │   │       ├── LoadingSpinner.tsx
│   │   │       ├── ErrorBoundary.tsx
│   │   │       └── index.ts
│   │   └── index.ts
│   ├── pages/                      # Page components
│   │   ├── HomePage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── CartPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   └── index.ts
│   ├── hooks/                      # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useCart.ts
│   │   ├── useProducts.ts
│   │   └── index.ts
│   ├── stores/                     # Zustand state management
│   │   ├── authStore.ts
│   │   ├── cartStore.ts
│   │   ├── productStore.ts
│   │   └── index.ts
│   ├── services/                   # API service clients
│   │   ├── api/
│   │   │   ├── auth.ts
│   │   │   ├── products.ts
│   │   │   ├── cart.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── types/                      # TypeScript type definitions
│   │   ├── api.ts
│   │   ├── components.ts
│   │   ├── stores.ts
│   │   └── index.ts
│   ├── utils/                      # Utility functions
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   ├── constants.ts
│   │   └── index.ts
│   ├── styles/                     # CSS and styling
│   │   ├── globals.css
│   │   ├── components.css
│   │   └── variables.css
│   ├── App.tsx                     # Main App component
│   ├── index.tsx                   # Application entry point
│   └── vite-env.d.ts              # Vite type definitions
├── tests/                          # Frontend-specific tests
│   ├── components/                 # Component tests
│   ├── hooks/                      # Hook tests
│   ├── pages/                      # Page tests
│   └── setup.ts                    # Test setup
├── .env.example                    # Frontend environment template
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── vite.config.ts                  # Vite configuration
├── tailwind.config.js              # Tailwind CSS configuration
└── Dockerfile                      # Frontend container configuration
```

#### **BFF Orchestration Service (`/apps/bff-orchestration/`)**
```
bff-orchestration/
├── src/main/java/com/shopster/bff/
│   ├── config/                     # Configuration classes
│   │   ├── SecurityConfig.java
│   │   ├── CorsConfig.java
│   │   ├── WebConfig.java
│   │   └── CircuitBreakerConfig.java
│   ├── controller/                 # REST controllers
│   │   ├── HomepageController.java
│   │   ├── ProductController.java
│   │   ├── UserController.java
│   │   └── HealthController.java
│   ├── service/                    # Business logic services
│   │   ├── HomepageService.java
│   │   ├── ProductOrchestrationService.java
│   │   ├── UserOrchestrationService.java
│   │   └── CacheService.java
│   ├── client/                     # Service clients
│   │   ├── UserServiceClient.java
│   │   ├── ProductServiceClient.java
│   │   ├── MembershipServiceClient.java
│   │   └── config/
│   │       ├── ClientConfig.java
│   │       └── RetryConfig.java
│   ├── dto/                        # Data transfer objects
│   │   ├── request/
│   │   │   ├── ProductSearchRequest.java
│   │   │   └── UserLoginRequest.java
│   │   ├── response/
│   │   │   ├── HomepageResponse.java
│   │   │   ├── ProductDetailResponse.java
│   │   │   └── ApiResponse.java
│   │   └── internal/
│   │       ├── ProductData.java
│   │       └── UserData.java
│   ├── exception/                  # Exception handling
│   │   ├── GlobalExceptionHandler.java
│   │   ├── ServiceUnavailableException.java
│   │   └── ValidationException.java
│   ├── util/                       # Utility classes
│   │   ├── ResponseBuilder.java
│   │   ├── DateUtil.java
│   │   └── CacheKeyGenerator.java
│   └── BffOrchestrationApplication.java
├── src/main/resources/
│   ├── application.yml             # Spring Boot configuration
│   ├── application-dev.yml         # Development profile
│   ├── application-prod.yml        # Production profile
│   └── logback-spring.xml          # Logging configuration
├── src/test/java/                  # Test classes
│   ├── controller/                 # Controller tests
│   ├── service/                    # Service tests
│   ├── client/                     # Client tests
│   └── integration/                # Integration tests
├── pom.xml                         # Maven configuration
├── Dockerfile                      # Container configuration
└── .env.example                    # Environment template
```

#### **User Service (`/apps/user-service/`)**
```
user-service/
├── src/main/java/com/shopster/user/
│   ├── config/                     # Configuration
│   │   ├── DatabaseConfig.java
│   │   ├── SecurityConfig.java
│   │   └── JwtConfig.java
│   ├── controller/                 # REST controllers
│   │   ├── UserController.java
│   │   ├── AuthController.java
│   │   └── ProfileController.java
│   ├── entity/                     # JPA entities
│   │   ├── User.java
│   │   ├── Role.java
│   │   ├── UserSession.java
│   │   └── audit/
│   │       └── AuditableEntity.java
│   ├── repository/                 # Data repositories
│   │   ├── UserRepository.java
│   │   ├── RoleRepository.java
│   │   └── UserSessionRepository.java
│   ├── service/                    # Business logic
│   │   ├── UserService.java
│   │   ├── AuthService.java
│   │   ├── ProfileService.java
│   │   └── JwtService.java
│   ├── dto/                        # Data transfer objects
│   │   ├── UserDto.java
│   │   ├── LoginDto.java
│   │   ├── RegisterDto.java
│   │   └── ProfileDto.java
│   ├── exception/                  # Exception handling
│   │   ├── UserNotFoundException.java
│   │   ├── AuthenticationException.java
│   │   └── ValidationException.java
│   └── UserServiceApplication.java
├── src/main/resources/
│   ├── application.yml
│   ├── db/migration/               # Flyway migrations
│   │   ├── V1__Create_users_table.sql
│   │   ├── V2__Create_roles_table.sql
│   │   └── V3__Create_sessions_table.sql
│   └── data.sql                    # Test data
├── src/test/java/                  # Tests
├── pom.xml
├── Dockerfile
└── .env.example
```

#### **Product Service (`/apps/product-service/`)**
```
product-service/
├── src/main/java/com/shopster/product/
│   ├── config/                     # Configuration
│   │   ├── MongoConfig.java
│   │   └── IndexConfig.java
│   ├── controller/                 # REST controllers
│   │   ├── ProductController.java
│   │   ├── CategoryController.java
│   │   └── SearchController.java
│   ├── document/                   # MongoDB documents
│   │   ├── Product.java
│   │   ├── Category.java
│   │   ├── Inventory.java
│   │   └── Review.java
│   ├── repository/                 # MongoDB repositories
│   │   ├── ProductRepository.java
│   │   ├── CategoryRepository.java
│   │   └── ReviewRepository.java
│   ├── service/                    # Business logic
│   │   ├── ProductService.java
│   │   ├── CategoryService.java
│   │   ├── SearchService.java
│   │   └── InventoryService.java
│   ├── dto/                        # Data transfer objects
│   │   ├── ProductDto.java
│   │   ├── CategoryDto.java
│   │   └── SearchResultDto.java
│   └── ProductServiceApplication.java
├── src/main/resources/
│   ├── application.yml
│   └── sample-data/                # Sample product data
│       ├── products.json
│       └── categories.json
├── src/test/java/                  # Tests with TestContainers
├── pom.xml
├── Dockerfile
└── .env.example
```

### **Shared Packages (`/packages/`)**

#### **Shared Types (`/packages/shared-types/`)**
```
shared-types/
├── src/
│   ├── api/
│   │   ├── common.ts               # Common API types
│   │   ├── user.ts                 # User-related types
│   │   ├── product.ts              # Product-related types
│   │   └── index.ts
│   ├── domain/
│   │   ├── entities.ts             # Domain entities
│   │   ├── valueObjects.ts         # Value objects
│   │   └── index.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

#### **Shared Utils (`/packages/shared-utils/`)**
```
shared-utils/
├── src/
│   ├── formatters/
│   │   ├── currency.ts
│   │   ├── date.ts
│   │   └── index.ts
│   ├── validators/
│   │   ├── email.ts
│   │   ├── password.ts
│   │   └── index.ts
│   ├── constants/
│   │   ├── api.ts
│   │   ├── regex.ts
│   │   └── index.ts
│   └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

### **Infrastructure (`/infrastructure/`)**

#### **Docker Configurations (`/infrastructure/docker/`)**
```
docker/
├── development/
│   ├── docker-compose.yml          # Development services
│   ├── postgres.yml                # PostgreSQL service
│   ├── mongodb.yml                 # MongoDB service
│   └── nginx.yml                   # Load balancer
├── production/
│   ├── docker-compose.prod.yml     # Production services
│   └── docker-compose.monitoring.yml # Monitoring stack
├── images/
│   ├── base/
│   │   ├── java.Dockerfile         # Base Java image
│   │   └── node.Dockerfile         # Base Node image
│   └── services/
│       ├── user-service.Dockerfile
│       └── product-service.Dockerfile
└── scripts/
    ├── build-all.sh                # Build all services
    ├── deploy.sh                   # Deployment script
    └── cleanup.sh                  # Cleanup script
```

### **Tools & Scripts (`/tools/`)**
```
tools/
├── scripts/
│   ├── setup/
│   │   ├── install-dependencies.sh
│   │   ├── setup-database.sh
│   │   └── generate-env.sh
│   ├── build/
│   │   ├── build-frontend.sh
│   │   ├── build-backend.sh
│   │   └── build-all.sh
│   └── deployment/
│       ├── deploy-dev.sh
│       ├── deploy-staging.sh
│       └── deploy-prod.sh
├── generators/
│   ├── component-generator/        # React component generator
│   ├── service-generator/          # Spring Boot service generator
│   └── api-generator/              # API client generator
└── migration/
    ├── database-migration.sh
    └── data-migration.sh
```

### **Testing (`/tests/`)**
```
tests/
├── e2e/
│   ├── playwright.config.ts        # Playwright configuration
│   ├── specs/
│   │   ├── homepage.spec.ts
│   │   ├── product-detail.spec.ts
│   │   └── checkout-flow.spec.ts
│   └── fixtures/
│       ├── test-data.json
│       └── mock-responses.json
├── integration/
│   ├── api-integration.test.js     # Cross-service tests
│   └── database-integration.test.js
└── performance/
    ├── load-tests/                 # JMeter or K6 tests
    └── stress-tests/
```

This structure provides clear separation of concerns, promotes code reuse through shared packages, and follows industry best practices for microservices architecture.