# Shopster Ecommerce Platform Development Prompt

## Project Overview
Build the complete **Shopster** ecommerce platform using the comprehensive specifications and context provided. This is a modern, responsive ecommerce website with React frontend, Spring Boot orchestration layer, and microservices backend.

## Context Files Reference
Before starting, review all context and specifications:

**Core Context:**
- [Project Overview](/.claude/context/overview.md) - Architecture and service boundaries
- [Technology Stack](/.claude/context/technology-stack.md) - Technical requirements and versions  
- [Architecture Patterns](/.claude/context/architecture-patterns.md) - Design patterns and code organization
- [Development Standards](/.claude/context/development-standards.md) - Coding conventions and quality gates
- [Brand Context](/.claude/context/brand-context.md) - Shopster design system, colors, typography
- [Infrastructure Specification](/.claude/context/infrastructure-spec.md) - Deployment and scaling
- [Visual Testing Workflow](/.claude/context/visual-testing-workflow.md) - Frontend testing procedures

**Service Specifications:**
- [Frontend Specification](/.claude/specs/frontend-specification.md) - Homepage and product detail page requirements
- [Backend Orchestration Specification](/.claude/specs/backend-orchestration-specification.md) - Spring MVC BFF layer and API endpoints

## Implementation Plan

### Phase 1: Backend Data Providers (Use Full-Stack Development Agent)
1. **User Service (`/apps/user-service/` - Port 8081)**
   - Service has Maven pom.xml configured with Spring Boot 3.2.0, JPA, Security, JWT
   - Implement User entity with JPA (PostgreSQL database)
   - Create UserRepository with Spring Data JPA
   - Build UserService with authentication logic and password hashing
   - Add UserController with REST endpoints for registration, login, profile
   - Include JWT token management with secure configuration
   - Add comprehensive unit and integration tests with TestContainers

2. **Product Service (`/apps/product-service/` - Port 8082)**
   - Service has Maven pom.xml configured with Spring Boot 3.2.0, MongoDB, Caching
   - Implement Product document with MongoDB
   - Create ProductRepository with Spring Data MongoDB
   - Build ProductService with CRUD operations and search capabilities
   - Add ProductController with catalog endpoints and filtering
   - Include caching with Caffeine for performance
   - Add comprehensive testing with TestContainers MongoDB

3. **Membership Service (`/apps/membership-service/` - Port 8083)**
   - Future service for loyalty programs (Maven pom.xml ready)
   - Will integrate with User Service for customer data
   - PostgreSQL database for membership records

### Phase 2: Orchestration Layer (Use Full-Stack Development Agent)
1. **BFF Orchestration Service (`/apps/bff-orchestration/` - Port 8080)**
   - Service has Maven pom.xml configured with Spring Boot 3.2.0, Web, Circuit Breaker
   - Follow [Backend Orchestration Specification](/.claude/specs/backend-orchestration-specification.md)
   - Implement HomepageController with hero content and carousel endpoints
   - Implement ProductController with product detail endpoints
   - Add service clients for User Service (8081) and Product Service (8082)
   - Include circuit breaker patterns with Resilience4j
   - Implement response caching and error handling
   - Add comprehensive API testing and service integration tests

### Phase 3: Frontend Implementation (Use Full-Stack Development Agent + Frontend Visual Testing Agent)
1. **React Application Setup (`/apps/frontend/`)**
   - React 18+ with TypeScript already initialized with Create React App
   - Configure shadcn/ui, Tailwind CSS with Shopster brand colors from [Brand Context](/.claude/context/brand-context.md)
   - Set up Zustand for state management, TanStack Query for server state
   - Implement routing with React Router v6
   - Integrate with shared packages: `@shopster/shared-types`, `@shopster/shared-utils`, `@shopster/api-client`

2. **Homepage Implementation**
   - Follow [Frontend Specification](/.claude/specs/frontend-specification.md) homepage layout
   - Create Hero Banner component with scrollable cards (max 5)
   - Build 3 Product Carousel components (Featured, Trending, Recommended)
   - Implement Footer Banner component for promotions
   - Apply Shopster brand design system from [Brand Context](/.claude/context/brand-context.md)
   - Use neutral color palette and Inter typography

3. **Product Detail Page Implementation**
   - Follow product detail page specification from [Frontend Specification](/.claude/specs/frontend-specification.md)
   - Create Product Image Gallery component with zoom functionality
   - Build comprehensive Buy Box component with options and cart integration
   - Implement product tabs (Description, Specs, Reviews, Shipping)
   - Add breadcrumb navigation and SEO optimization

### Phase 4: Visual Testing & Quality Assurance (Use Frontend Visual Testing Agent)
1. **Visual Testing Implementation**
   - Follow [Visual Testing Workflow](/.claude/context/visual-testing-workflow.md) 7-step process
   - Use Playwright MCP for automated browser testing
   - Test all components across mobile (375px), tablet (768px), desktop (1920px)
   - Capture screenshots in `/.claude/frontend_screenshot_testing/` with proper naming
   - Verify accessibility compliance (WCAG 2.1 AA)
   - Test Core Web Vitals performance metrics

2. **Component Testing**
   - Test Hero Banner: scrollable cards, auto-play, responsive behavior
   - Test Product Carousels: navigation, touch support, loading states
   - Test Product Detail: image gallery, buy box functionality, tabs
   - Validate against acceptance criteria from specifications

### Phase 5: Code Reviews & Standards (Use Senior Code Review Engineer Agent)
1. **Backend Code Review**
   - Review all Spring Boot services against [Development Standards](/.claude/context/development-standards.md)
   - Validate architectural compliance with [Architecture Patterns](/.claude/context/architecture-patterns.md)
   - Security review: authentication, input validation, SQL injection prevention
   - Performance review: database queries, connection pooling, caching

2. **Frontend Code Review**
   - Review React components against coding standards
   - Validate TypeScript strict mode compliance
   - Accessibility and performance validation
   - Brand design system compliance

### Phase 6: Infrastructure & Deployment (Use DevOps Deployment Agent)
1. **Containerization (`/infrastructure/docker/`)**
   - Create Docker files for all services following [Infrastructure Specification](/.claude/context/infrastructure-spec.md)
   - Frontend: React app served by Nginx
   - Backend Services: Spring Boot with Java 17 base images
   - Set up Docker Compose for development environment with PostgreSQL and MongoDB
   - Configure nginx load balancer with service routing (`/infrastructure/nginx/`)

2. **CI/CD Pipeline**
   - Implement GitHub Actions workflow
   - Add automated testing (backend unit/integration, frontend component)
   - Include security scanning and quality gates
   - Set up automated deployment process

## Quality Gates & Acceptance Criteria

### Technical Requirements
- [ ] All services run in Docker containers
- [ ] React frontend communicates with Spring MVC orchestration layer only
- [ ] PostgreSQL for user data, MongoDB for product catalog
- [ ] Comprehensive test coverage (80% backend, 75% frontend)
- [ ] TypeScript strict mode compliance
- [ ] WCAG 2.1 AA accessibility compliance

### Visual Requirements  
- [ ] Homepage: Hero banner + 3 product carousels + footer banner
- [ ] Product detail: Image gallery (left) + buy box (right) + footer
- [ ] Shopster brand colors and typography applied consistently
- [ ] Responsive design across mobile, tablet, desktop
- [ ] Visual testing screenshots captured and validated

### Performance Requirements
- [ ] First Contentful Paint < 1.5s
- [ ] Largest Contentful Paint < 2.5s
- [ ] First Input Delay < 100ms
- [ ] Cumulative Layout Shift < 0.1
- [ ] API responses < 500ms

## Specialized Agent Usage

**Use Full-Stack Development Agent for:**
- All backend service implementation (User Store, Product Store, BFF Orchestration)
- Frontend component development and API integration
- Database design and entity relationships
- End-to-end feature implementation

**Use Frontend Visual Testing Agent for:**
- Visual testing workflow execution
- Cross-viewport responsive testing  
- Accessibility compliance validation
- Performance metrics monitoring
- Screenshot capture and evidence documentation

**Use Senior Code Review Engineer Agent for:**
- Code quality and standards compliance
- Security vulnerability assessment
- Architecture pattern validation
- Performance optimization review

**Use DevOps Deployment Agent for:**
- Docker containerization and orchestration
- CI/CD pipeline implementation  
- Infrastructure setup and monitoring
- Database deployment and management

## Expected Deliverables
1. **Running Application**: Complete Shopster ecommerce platform
2. **Documentation**: Updated with any implementation notes
3. **Test Results**: Visual testing reports and code coverage
4. **Deployment**: Containerized application ready for production
5. **Code Reviews**: Comprehensive review reports from all agents

Execute this development plan systematically, using the appropriate specialized agents for each phase, and ensure all specifications and quality gates are met.

---

## MCP Server Integration

The following MCP servers are already configured and should be used throughout development:

### **Available MCP Servers**
1. **PostgreSQL MCP** - Database operations, schema validation, query optimization
   - Use for User Service and Membership Service database operations
   - Validate migrations and data integrity
   - Performance analysis and query optimization

2. **GitHub MCP** - Version control and CI/CD integration  
   - Automated pull request workflows
   - Issue tracking and project management
   - Repository health monitoring

3. **Filesystem MCP** - Advanced file operations and project management
   - Code generation and templating
   - File structure analysis and cleanup
   - Log file analysis and debugging

4. **Brave Search MCP** - Research and documentation
   - Best practices research for Spring Boot and React
   - Dependency vulnerability checking
   - Performance optimization techniques

### **MCP Server Usage in Development Phases**

**Phase 1 & 2 (Backend Development):**
- Use PostgreSQL MCP to design and validate database schemas
- Use GitHub MCP for code reviews and pull request management
- Use Brave Search MCP to research Spring Boot best practices

**Phase 3 (Frontend Development):**
- Use Filesystem MCP for component scaffolding and file organization
- Use GitHub MCP for automated testing on commits
- Use Brave Search MCP for React performance optimization

**Phase 4 (Visual Testing):**
- Use Filesystem MCP for screenshot organization and management
- Use GitHub MCP to link visual testing results to issues

**Phase 5 (Code Review):**
- Use PostgreSQL MCP for database security analysis
- Use GitHub MCP for comprehensive pull request reviews
- Use Brave Search MCP for security vulnerability research

**Phase 6 (Infrastructure):**
- Use Filesystem MCP for Docker configuration management
- Use GitHub MCP for CI/CD pipeline automation

This prompt leverages all the comprehensive context we've built, the current project structure with properly configured services, and guides systematic development using the specialized agents enhanced with MCP server capabilities.