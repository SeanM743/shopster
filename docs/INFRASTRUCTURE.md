# Infrastructure Deployment Guide

## Service Discovery & Multi-Host Deployment

### 1. Service Discovery Options

#### Option A: Kubernetes (Recommended)
```yaml
# Service discovery via DNS
apiVersion: v1
kind: Service
metadata:
  name: product-service
spec:
  selector:
    app: product-service
  ports:
  - port: 8082
    targetPort: 8082

# Other services connect via: http://product-service:8082
```

#### Option B: Spring Cloud Eureka
```yaml
# eureka-server.yml
eureka:
  client:
    register-with-eureka: false
    fetch-registry: false
  server:
    enable-self-preservation: false
```

```java
// In each service
@EnableEurekaClient
@SpringBootApplication
public class ProductServiceApplication {
    // Service registers itself with Eureka
}
```

#### Option C: External Load Balancer + DNS
```yaml
# docker-compose.yml for multi-host
version: '3.8'
services:
  product-service:
    image: shopster/product-service:latest
    environment:
      - EUREKA_CLIENT_SERVICE_URL_DEFAULTZONE=http://eureka-server:8761/eureka
    networks:
      - shopster-network
    deploy:
      placement:
        constraints: [node.hostname == host1]
  
  

networks:
  shopster-network:
    external: true
```

### 2. Multi-Host Configuration

#### Environment Variables for Service URLs
```bash
# Host 1 - Product Service
MONGODB_URI=mongodb://db-host:27017/shopster_products
EUREKA_CLIENT_SERVICE_URL_DEFAULTZONE=http://discovery-host:8761/eureka



# Host 3 - User Service
POSTGRES_URI=postgresql://db-host:5432/shopster_users
```

#### Docker Swarm for Multi-Host
```bash
# Initialize swarm
docker swarm init --advertise-addr <manager-ip>

# Join workers
docker swarm join --token <token> <manager-ip>:2377

# Deploy stack
docker stack deploy -c docker-compose.yml shopster
```

### 3. Infrastructure Patterns

#### Pattern 1: Microservices per Host
```
Host 1: Frontend + CDN
Host 2: Product Service + MongoDB
Host 3: User Service + PostgreSQL
Host 4: Cart Service + Redis
Host 5: Membership Service + PostgreSQL
```

#### Pattern 2: Service Mesh (Istio)
```yaml
# Automatic service discovery and load balancing
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: product-service
spec:
  hosts:
  - product-service
  http:
  - route:
    - destination:
        host: product-service
        subset: v1
      weight: 90
    - destination:
        host: product-service  
        subset: v2
      weight: 10
```

### 4. Load Balancing & High Availability

#### NGINX Load Balancer
```nginx
upstream product_service {
    server host1:8082 weight=3;
    server host2:8082 weight=2;
    server host3:8082 backup;
}



server {
    listen 80;
    server_name api.shopster.com;
    
    location /api/v1/products {
        proxy_pass http://product_service;
    }
    
    location /api/v1 {
        proxy_pass http://shopster-api-gateway:8080;
    }
}
```

#### Circuit Breaker Configuration
```yaml
# application.yml
resilience4j:
  circuitbreaker:
    instances:
      productService:
        failure-rate-threshold: 50
        minimum-number-of-calls: 10
        automatic-transition-from-open-to-half-open-enabled: true
        wait-duration-in-open-state: 5s
        permitted-number-of-calls-in-half-open-state: 3
        sliding-window-size: 10
        sliding-window-type: count_based
```

### 5. Database Clustering

#### MongoDB Replica Set
```javascript
rs.initiate({
  _id: "shopster-rs",
  members: [
    { _id: 0, host: "mongo1:27017", priority: 2 },
    { _id: 1, host: "mongo2:27017", priority: 1 },
    { _id: 2, host: "mongo3:27017", arbiterOnly: true }
  ]
})
```

#### PostgreSQL Master-Slave
```yaml
# docker-compose.yml
postgres-master:
  image: postgres:15
  environment:
    POSTGRES_REPLICATION_MODE: master
    POSTGRES_REPLICATION_USER: replicator
    
postgres-slave:
  image: postgres:15
  environment:
    POSTGRES_REPLICATION_MODE: slave
    POSTGRES_MASTER_HOST: postgres-master
```

## Infrastructure Recommendations

### Small to Medium Scale (< 10k users)
- **Single Cloud Provider**: AWS/GCP/Azure
- **Container Orchestration**: Docker Compose or single Kubernetes cluster
- **Database**: Managed services (RDS, DocumentDB, ElastiCache)
- **Load Balancer**: Cloud provider load balancer
- **Monitoring**: Cloud native monitoring

### Large Scale (10k+ users)
- **Multi-Region**: Deploy across multiple regions
- **Kubernetes**: Full K8s with auto-scaling
- **Service Mesh**: Istio for advanced traffic management  
- **Database Sharding**: Horizontal scaling
- **CDN**: CloudFlare or CloudFront
- **Observability**: Prometheus, Grafana, Jaeger

### Development/Testing
- **Local**: Docker Compose
- **Staging**: Single Kubernetes cluster
- **CI/CD**: GitHub Actions with automated testing

## Configuration Management

### Spring Cloud Config
```yaml
# config-server.yml
spring:
  cloud:
    config:
      server:
        git:
          uri: https://github.com/shopster/config-repo
          search-paths: '{application}'
```

### External Configuration
```bash
# Environment-specific configs
/config
├── application.yml          # Default config
├── application-dev.yml      # Development  
├── application-staging.yml  # Staging
├── application-prod.yml     # Production
└── secrets/
    ├── database-credentials.yml
    └── api-keys.yml
```