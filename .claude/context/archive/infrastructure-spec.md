# Infrastructure & Deployment Specification

This document defines the infrastructure architecture, deployment strategies, and operational requirements for the ecommerce platform.

## System Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Application Load Balancer               │
│                        (nginx/HAProxy)                     │
└─────────────────┬───────────────────┬─────────────────────┘
                  │                   │
        ┌─────────▼──────────┐ ┌──────▼──────────┐
        │   Frontend App     │ │   Backend Services│
        │   (React/nginx)    │ │  (Spring Boot)  │
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

## Database Architecture

### **Primary Database - PostgreSQL**
- **Purpose**: User management, authentication, orders, transactions
- **Environment Configuration**:
  - **Development/Testing**: H2 in-memory database
  - **Production**: PostgreSQL 15+
- **Configuration**:
  - Connection pooling with HikariCP (20 max connections)
  - Read replicas for scalability
  - Automated backups and point-in-time recovery
- **Schema**: Normalized relational data for ACID compliance

#### Production Configuration
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/ecommerce
    username: ${DB_USER}
    password: ${DB_PASSWORD}
    hikari:
      maximum-pool-size: 20
      minimum-idle: 5
      connection-timeout: 20000
      idle-timeout: 300000
      max-lifetime: 1200000
```

### **Product Database - MongoDB**
- **Purpose**: Product catalog, inventory, pricing, search functionality
- **Environment**: MongoDB Atlas (free tier M0 for development)
- **Configuration**:
  - Document-based storage for flexible product schemas
  - Text search indexes for product search capabilities
  - Geospatial indexes for location-based features
- **Collections**: Products, Categories, Inventory, Reviews

#### MongoDB Configuration
```yaml
spring:
  data:
    mongodb:
      uri: ${MONGODB_URI}
      database: ecommerce-products
      auto-index-creation: true
```

### **Cache Layer - Redis (Future)**
- **Purpose**: Session storage, API response caching, rate limiting
- **Environment**: Redis Cloud (free tier)
- **Use Cases**: JWT token blacklisting, product recommendations, cart data

## Application Server Architecture

### **HTTP Server - Spring WebFlux with Netty**
```yaml
server:
  port: 8080
  netty:
    connection-timeout: 20s
    h2c-max-content-length: 0B
  threads:
    max: 200
    min: 8
```

### **Custom Thread Pool Configuration**
```java
@Configuration
public class ThreadPoolConfig {
    
    @Bean("ioExecutor")
    public Executor ioExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(10);
        executor.setMaxPoolSize(50);
        executor.setQueueCapacity(100);
        executor.setThreadNamePrefix("io-pool-");
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.initialize();
        return executor;
    }
    
    @Bean("dbExecutor") 
    public Executor dbExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(20);
        executor.setQueueCapacity(50);
        executor.setThreadNamePrefix("db-pool-");
        executor.initialize();
        return executor;
    }
}
```

## Load Balancer Configuration

### **nginx Configuration**
```nginx
upstream backend {
    server backend1:8080;
    server backend2:8080;
    server backend3:8080;
}

upstream frontend {
    server frontend1:3000;
    server frontend2:3000;
}

server {
    listen 80;
    
    # API routing
    location /api/ {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_connect_timeout 30s;
        proxy_send_timeout 30s;
        proxy_read_timeout 30s;
    }
    
    # Frontend routing
    location / {
        proxy_pass http://frontend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        try_files $uri $uri/ /index.html; # SPA routing support
    }
    
    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
    }
}
```

## Containerization Strategy

### **Backend Service Dockerfile**
```dockerfile
FROM openjdk:17-jdk-slim AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN ./mvnw clean package -DskipTests

FROM openjdk:17-jre-slim
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar

# Add non-root user for security
RUN addgroup --system --gid 1001 spring && \
    adduser --system --uid 1001 --gid 1001 spring
USER spring:spring

EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
```

### **Frontend Dockerfile**
```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

# Add non-root user
RUN addgroup -g 1001 -S nginx && \
    adduser -S -D -H -u 1001 -h /var/cache/nginx -s /sbin/nologin -G nginx -g nginx nginx

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### **Docker Compose - Development**
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: ecommerce
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U admin"]
      interval: 10s
      timeout: 5s
      retries: 5

  mongodb:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    healthcheck:
      test: ["CMD", "mongosh", "--eval", "db.adminCommand('ping')"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    command: redis-server --appendonly yes
    volumes:
      - redis_data:/data

  backend:
    build: ./backend
    ports:
      - "8080:8080"
    environment:
      - DATABASE_URL=jdbc:postgresql://postgres:5432/ecommerce
      - MONGO_URI=mongodb://mongodb:27017/products
      - REDIS_URL=redis://redis:6379
    depends_on:
      postgres:
        condition: service_healthy
      mongodb:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
    depends_on:
      - frontend
      - backend

volumes:
  postgres_data:
  mongodb_data:
  redis_data:
```

## CI/CD Pipeline

### **GitHub Actions Configuration**
```yaml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: ${{ github.repository }}

jobs:
  test-backend:
    runs-on: ubuntu-latest
    services:
      postgres:
        image: postgres:15
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5
    steps:
      - uses: actions/checkout@v4
      - name: Set up JDK 17
        uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'
      - name: Cache Maven dependencies
        uses: actions/cache@v3
        with:
          path: ~/.m2
          key: ${{ runner.os }}-m2-${{ hashFiles('**/pom.xml') }}
      - name: Run backend tests
        run: cd backend && ./mvnw test
      - name: Generate test report
        uses: dorny/test-reporter@v1
        if: success() || failure()
        with:
          name: Backend Tests
          path: backend/target/surefire-reports/*.xml
          reporter: java-junit

  test-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
          cache-dependency-path: frontend/package-lock.json
      - name: Install dependencies
        run: cd frontend && npm ci
      - name: Run frontend tests
        run: cd frontend && npm test -- --coverage --watchAll=false
      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          directory: ./frontend/coverage

  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'
      - name: Upload Trivy scan results to GitHub Security
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'

  build-and-deploy:
    needs: [test-backend, test-frontend, security-scan]
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Log in to Container Registry
        uses: docker/login-action@v2
        with:
          registry: ${{ env.REGISTRY }}
          username: ${{ github.actor }}
          password: ${{ secrets.GITHUB_TOKEN }}
      - name: Build and push Docker images
        run: |
          # Build backend
          docker build -t ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/backend:${{ github.sha }} ./backend
          docker push ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/backend:${{ github.sha }}
          
          # Build frontend
          docker build -t ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/frontend:${{ github.sha }} ./frontend
          docker push ${{ env.REGISTRY }}/${{ env.IMAGE_NAME }}/frontend:${{ github.sha }}
```

## Monitoring & Observability

### **Health Check Configuration**
```java
@Component
@ConditionalOnProperty(name = "management.endpoint.health.enabled", havingValue = "true")
public class CustomHealthIndicator implements HealthIndicator {
    
    private final UserRepository userRepository;
    private final MongoTemplate mongoTemplate;
    
    @Override
    public Health health() {
        try {
            // Check database connectivity
            userRepository.count();
            mongoTemplate.getCollectionNames();
            
            return Health.up()
                .withDetail("database", "PostgreSQL connected")
                .withDetail("mongodb", "MongoDB connected")
                .build();
        } catch (Exception e) {
            return Health.down()
                .withDetail("error", e.getMessage())
                .build();
        }
    }
}
```

### **Metrics Configuration**
```java
@Configuration
public class MetricsConfig {
    
    @Bean
    public TimedAspect timedAspect(MeterRegistry registry) {
        return new TimedAspect(registry);
    }
    
    @Bean
    public MeterRegistryCustomizer<MeterRegistry> metricsCommonTags() {
        return registry -> registry.config().commonTags("application", "ecommerce");
    }
}

// Usage in services
@Service
@Timed(name = "user.service", description = "Time taken for user operations")
public class UserService {
    
    @Timed(name = "user.creation", description = "Time taken to create user")
    public User createUser(CreateUserDto dto) {
        // Implementation
    }
}
```

### **Logging Configuration**
```yaml
logging:
  level:
    com.ecommerce: INFO
    org.springframework.security: DEBUG
  pattern:
    console: "%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level [%X{traceId},%X{spanId}] %logger{36} - %msg%n"
    file: "%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level [%X{traceId},%X{spanId}] %logger{36} - %msg%n"
  file:
    name: logs/application.log
    max-size: 10MB
    max-history: 30
    total-size-cap: 1GB
```

## Security Configuration

### **CORS Configuration**
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList(
            "http://localhost:3000",
            "https://*.yourdomain.com"
        ));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }
}
```

### **Rate Limiting (Future with Redis)**
```java
@Component
public class RateLimitingFilter implements WebFilter {
    
    private final RedisTemplate<String, String> redisTemplate;
    
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        String clientIP = getClientIP(exchange.getRequest());
        String key = "rate_limit:" + clientIP;
        
        return redisTemplate.opsForValue()
            .increment(key)
            .map(count -> {
                if (count == 1) {
                    redisTemplate.expire(key, Duration.ofMinutes(1));
                }
                return count;
            })
            .flatMap(count -> {
                if (count > 100) { // 100 requests per minute
                    return handleRateLimit(exchange);
                }
                return chain.filter(exchange);
            });
    }
}
```

## Scaling Considerations

### **Horizontal Scaling**
- **Stateless Services**: All services designed for horizontal scaling
- **Session Storage**: Redis for shared session state
- **Database**: Read replicas and connection pooling
- **File Storage**: AWS S3 or equivalent for product images

### **Performance Optimization**
- **Database Connection Pooling**: HikariCP with 20 max connections
- **Caching Strategy**: Redis for API responses and session data
- **CDN**: CloudFront or equivalent for static assets
- **Code Optimization**: JVM tuning and garbage collection optimization

## MCP Server Infrastructure

### **Model Context Protocol Integration**

The Shopster platform leverages MCP servers to enhance development, deployment, and operational capabilities across the infrastructure.

#### **Installed MCP Servers**

##### **Database Operations - PostgreSQL MCP**
```json
{
  "name": "postgres", 
  "command": "npx @modelcontextprotocol/server-postgres@latest",
  "env": {
    "POSTGRES_URL": "${POSTGRES_URL}"
  }
}
```
- **Purpose**: Direct database operations, schema management, data validation
- **Usage**: Database migrations, data integrity checks, performance analysis
- **Security**: Read-only access for production, full access for development

##### **Version Control - GitHub MCP**  
```json
{
  "name": "github",
  "command": "npx @modelcontextprotocol/server-github@latest", 
  "env": {
    "GITHUB_TOKEN": "${GITHUB_TOKEN}"
  }
}
```
- **Purpose**: Repository operations, CI/CD coordination, issue management
- **Usage**: Automated deployments, code reviews, release management
- **Security**: Scoped tokens with minimal required permissions

##### **File System Operations - Filesystem MCP**
```json
{
  "name": "filesystem",
  "command": "npx @modelcontextprotocol/server-filesystem@latest"
}
```
- **Purpose**: Advanced file operations, log analysis, configuration management
- **Usage**: Deployment scripts, log aggregation, backup operations
- **Security**: Restricted to specific directories and operations

##### **Web Browser Automation - Playwright MCP**
```json
{
  "name": "playwright", 
  "command": "npx @playwright/mcp@latest"
}
```
- **Purpose**: Automated testing, visual regression testing, monitoring
- **Usage**: End-to-end testing, visual validation, health check automation
- **Integration**: Visual testing workflow and quality assurance

##### **Research and Documentation - Brave Search MCP**
```json
{
  "name": "brave-search",
  "command": "npx @modelcontextprotocol/server-brave-search@latest",
  "env": {
    "BRAVE_API_KEY": "${BRAVE_API_KEY}"
  }
}
```
- **Purpose**: Research capabilities, documentation lookup, troubleshooting
- **Usage**: Finding solutions, best practices research, dependency updates
- **Security**: API key management and rate limiting

### **MCP Server Deployment Architecture**

#### **Development Environment**
```yaml
# docker-compose.dev.yml MCP integration
version: '3.8'
services:
  mcp-coordinator:
    image: node:18-alpine
    command: npm start
    environment:
      - POSTGRES_URL=${POSTGRES_URL}
      - GITHUB_TOKEN=${GITHUB_TOKEN}
      - NODE_ENV=development
    volumes:
      - ./mcp-config:/app/config
      - ~/.claude.json:/app/claude-config.json:ro
    networks:
      - shopster-network
```

#### **Production Environment**
- **Containerized MCP Servers**: Each MCP server runs in isolated containers
- **Environment Separation**: Production MCP servers use read-only database access
- **Security Hardening**: Minimal permissions, network isolation, audit logging
- **High Availability**: Redundant MCP server instances with load balancing

### **Environment Configuration Management**

#### **.env File Structure**
```bash
# MCP Server Configuration
POSTGRES_URL=jdbc:postgresql://localhost:5432/shopster_users
MONGODB_URI=mongodb://localhost:27017/shopster_products
GITHUB_TOKEN=ghp_your_github_token_here
BRAVE_API_KEY=your_brave_search_api_key

# Environment-specific overrides
MCP_LOG_LEVEL=INFO
MCP_TIMEOUT=30000
MCP_RETRY_ATTEMPTS=3
```

#### **Secret Management Strategy**
```yaml
# Future: Kubernetes Secret Management
apiVersion: v1
kind: Secret
metadata:
  name: mcp-secrets
type: Opaque
data:
  postgres-url: <base64-encoded-url>
  github-token: <base64-encoded-token>
  jwt-secret: <base64-encoded-secret>
```

### **Monitoring & Observability for MCP Servers**

#### **Health Checks**
```yaml
# MCP Server Health Monitoring
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost:3000/health/mcp"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

#### **Logging Configuration**
```yaml
logging:
  level:
    com.shopster.mcp: DEBUG
    org.modelcontextprotocol: INFO
  appenders:
    mcp-audit:
      type: RollingFile
      fileName: logs/mcp-operations.log
      pattern: "%d{yyyy-MM-dd HH:mm:ss} [%thread] %-5level [MCP] %logger{36} - %msg%n"
```

#### **Metrics Collection**
- **MCP Operation Metrics**: Track usage patterns, response times, error rates
- **Database Connection Monitoring**: Monitor PostgreSQL MCP connections
- **GitHub API Usage**: Track API rate limits and usage patterns
- **File System Operations**: Monitor disk usage and file operation patterns

### **Security Configuration for MCP Servers**

#### **Access Control Matrix**
| MCP Server | Development | Staging | Production |
|------------|-------------|---------|------------|
| PostgreSQL | Read/Write | Read/Write | Read-Only |
| GitHub | Full Access | Limited | Deploy-Only |
| Filesystem | Full Access | Limited | Read-Only |
| Playwright | Full Access | Full Access | Limited |

#### **Network Security**
```yaml
# Docker network isolation
networks:
  mcp-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16
  application-network:
    driver: bridge
    internal: true
```

#### **Audit and Compliance**
- **Operation Logging**: All MCP operations logged with user attribution
- **Access Monitoring**: Real-time monitoring of MCP server access
- **Compliance Reporting**: Regular reports on MCP usage and security
- **Incident Response**: Automated alerts for suspicious MCP activity

### **CI/CD Integration with MCP Servers**

#### **GitHub Actions Integration**
```yaml
# .github/workflows/mcp-operations.yml
name: MCP-Enhanced CI/CD
on:
  push:
    branches: [main, develop]
jobs:
  database-migration:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Database Migrations
        run: |
          # Use PostgreSQL MCP to execute migrations
          claude postgres mcp migrate --environment=staging
      
  visual-testing:
    runs-on: ubuntu-latest  
    steps:
      - uses: actions/checkout@v4
      - name: Run Visual Tests
        run: |
          # Use Playwright MCP for automated visual testing
          claude playwright mcp run-visual-tests --capture-screenshots
```

#### **Deployment Automation**
- **Database Deployments**: PostgreSQL MCP for schema migrations
- **Repository Operations**: GitHub MCP for release management
- **Configuration Management**: Filesystem MCP for environment setup
- **Testing Automation**: Playwright MCP for end-to-end validation

This infrastructure specification provides a solid foundation for deploying and scaling the ecommerce platform with enhanced MCP server capabilities. For architectural patterns and development standards, see the respective context files.