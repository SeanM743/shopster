# Deployment Guide

## Overview
This guide covers deployment strategies for the Shopster ecommerce platform across different environments.

## 🚀 Deployment Options

### 1. Docker Compose (Development/Testing)
### 2. Kubernetes (Production)  
### 3. Cloud Platform (AWS/GCP/Azure)
### 4. Manual Deployment

---

## 🐳 Docker Compose Deployment

### Prerequisites
- Docker 20.0+
- Docker Compose 2.0+
- 4GB+ RAM
- 20GB+ disk space

### Quick Start
```bash
# Clone repository
git clone <repository-url>
cd shopster-ecommerce

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Environment Configuration
Create `.env` file in root directory:
```bash
# Database Configuration
MONGODB_URI=mongodb://mongodb:27017/shopster_products
POSTGRES_URI=postgresql://postgres:5432/shopster_users
REDIS_URI=redis://redis:6379

# Service URLs
PRODUCT_SERVICE_URL=http://product-service:8082
USER_SERVICE_URL=http://user-service:8083
BFF_SERVICE_URL=http://bff-orchestration:8081

# Security
JWT_SECRET=your-super-secret-jwt-key-here
ENCRYPTION_KEY=your-encryption-key-here

# External Services
STRIPE_SECRET_KEY=sk_test_...
SENDGRID_API_KEY=SG...

# Monitoring
ENABLE_METRICS=true
LOG_LEVEL=INFO
```

### Docker Compose Services
```yaml
version: '3.8'
services:
  # Frontend
  frontend:
    build: ./apps/frontend
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_BFF_URL=http://localhost:8081
    depends_on:
      - bff-orchestration

  # BFF Orchestration  
  bff-orchestration:
    build: ./apps/bff-orchestration
    ports:
      - "8081:8081"
    environment:
      - SPRING_PROFILES_ACTIVE=docker
      - SERVICES_PRODUCT_SERVICE_URL=http://product-service:8082
    depends_on:
      - product-service
      - user-service

  # Product Service
  product-service:
    build: ./apps/product-service
    ports:
      - "8082:8082" 
    environment:
      - SPRING_PROFILES_ACTIVE=docker
      - SPRING_DATA_MONGODB_URI=mongodb://mongodb:27017/shopster_products
    depends_on:
      - mongodb

  # User Service
  user-service:
    build: ./apps/user-service
    ports:
      - "8083:8083"
    environment:
      - SPRING_PROFILES_ACTIVE=docker
      - SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/shopster_users
    depends_on:
      - postgres

  # Databases
  mongodb:
    image: mongo:7.0
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
      - ./init-mongo.js:/docker-entrypoint-initdb.d/init-mongo.js

  postgres:
    image: postgres:15
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=shopster_users
      - POSTGRES_USER=shopster
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  mongodb_data:
  postgres_data:
  redis_data:
```

---

## ☸️ Kubernetes Deployment

### Prerequisites
- Kubernetes 1.24+
- kubectl configured
- Helm 3.0+ (optional)
- Container registry access

### Namespace Setup
```bash
kubectl create namespace shopster-prod
kubectl config set-context --current --namespace=shopster-prod
```

### ConfigMap and Secrets
```yaml
# config/configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: shopster-config
data:
  SPRING_PROFILES_ACTIVE: "prod"
  LOG_LEVEL: "INFO"
  ENABLE_METRICS: "true"

---
# config/secrets.yaml
apiVersion: v1
kind: Secret
metadata:
  name: shopster-secrets
type: Opaque
stringData:
  MONGODB_URI: "mongodb://mongodb-service:27017/shopster_products"
  JWT_SECRET: "your-super-secret-jwt-key"
  STRIPE_SECRET_KEY: "sk_live_..."
```

### Database Deployments
```yaml
# k8s/mongodb.yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mongodb
spec:
  serviceName: mongodb-service
  replicas: 1
  selector:
    matchLabels:
      app: mongodb
  template:
    metadata:
      labels:
        app: mongodb
    spec:
      containers:
      - name: mongodb
        image: mongo:7.0
        ports:
        - containerPort: 27017
        volumeMounts:
        - name: mongodb-storage
          mountPath: /data/db
        env:
        - name: MONGO_INITDB_DATABASE
          value: shopster_products
  volumeClaimTemplates:
  - metadata:
      name: mongodb-storage
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 50Gi

---
apiVersion: v1
kind: Service
metadata:
  name: mongodb-service
spec:
  selector:
    app: mongodb
  ports:
  - port: 27017
    targetPort: 27017
```

### Application Deployments
```yaml
# k8s/product-service.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: product-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: product-service
  template:
    metadata:
      labels:
        app: product-service
    spec:
      containers:
      - name: product-service
        image: shopster/product-service:latest
        ports:
        - containerPort: 8082
        env:
        - name: SPRING_PROFILES_ACTIVE
          valueFrom:
            configMapKeyRef:
              name: shopster-config
              key: SPRING_PROFILES_ACTIVE
        - name: MONGODB_URI
          valueFrom:
            secretKeyRef:
              name: shopster-secrets
              key: MONGODB_URI
        resources:
          requests:
            memory: "512Mi"
            cpu: "500m"
          limits:
            memory: "1Gi" 
            cpu: "1000m"
        livenessProbe:
          httpGet:
            path: /actuator/health
            port: 8082
          initialDelaySeconds: 60
          periodSeconds: 30
        readinessProbe:
          httpGet:
            path: /actuator/health/readiness
            port: 8082
          initialDelaySeconds: 30
          periodSeconds: 10

---
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
```

### Ingress Configuration
```yaml
# k8s/ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: shopster-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: letsencrypt-prod
spec:
  tls:
  - hosts:
    - shopster.com
    - api.shopster.com
    secretName: shopster-tls
  rules:
  - host: shopster.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: frontend-service
            port:
              number: 3000
  - host: api.shopster.com  
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: bff-service
            port:
              number: 8081
```

### Deployment Commands
```bash
# Apply all configurations
kubectl apply -f k8s/

# Check deployment status
kubectl get pods
kubectl get services
kubectl get ingress

# View logs
kubectl logs -f deployment/product-service

# Scale deployment
kubectl scale deployment product-service --replicas=5

# Update deployment
kubectl set image deployment/product-service product-service=shopster/product-service:v2.0

# Rollback deployment
kubectl rollout undo deployment/product-service
```

---

## ☁️ Cloud Platform Deployment

### AWS Deployment

#### EKS Setup
```bash
# Create EKS cluster
eksctl create cluster --name shopster-prod --region us-west-2 --nodegroup-name workers --node-type m5.large --nodes 3

# Configure kubectl
aws eks update-kubeconfig --region us-west-2 --name shopster-prod

# Install AWS Load Balancer Controller
kubectl apply -k "github.com/aws/eks-charts/stable/aws-load-balancer-controller//crds?ref=master"
```

#### RDS for PostgreSQL
```bash
# Create RDS instance
aws rds create-db-instance \
  --db-instance-identifier shopster-prod-db \
  --db-instance-class db.t3.medium \
  --engine postgres \
  --master-username shopster \
  --master-user-password $(openssl rand -base64 32) \
  --allocated-storage 100 \
  --vpc-security-group-ids sg-12345678
```

#### DocumentDB for MongoDB
```bash
# Create DocumentDB cluster
aws docdb create-db-cluster \
  --db-cluster-identifier shopster-prod-docdb \
  --engine docdb \
  --master-username shopster \
  --master-user-password $(openssl rand -base64 32)
```

### Google Cloud Platform

#### GKE Setup
```bash
# Create GKE cluster
gcloud container clusters create shopster-prod \
  --zone us-central1-a \
  --num-nodes 3 \
  --machine-type n1-standard-2

# Get credentials
gcloud container clusters get-credentials shopster-prod --zone us-central1-a
```

#### Cloud SQL
```bash
# Create PostgreSQL instance
gcloud sql instances create shopster-prod-db \
  --database-version POSTGRES_14 \
  --tier db-n1-standard-2 \
  --region us-central1
```

### Azure Deployment

#### AKS Setup
```bash
# Create resource group
az group create --name shopster-prod --location eastus

# Create AKS cluster
az aks create \
  --resource-group shopster-prod \
  --name shopster-prod-aks \
  --node-count 3 \
  --enable-addons monitoring \
  --generate-ssh-keys

# Get credentials
az aks get-credentials --resource-group shopster-prod --name shopster-prod-aks
```

---

## 📊 Monitoring & Observability

### Prometheus & Grafana Setup
```yaml
# monitoring/prometheus.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-config
data:
  prometheus.yml: |
    global:
      scrape_interval: 15s
    scrape_configs:
    - job_name: 'product-service'
      static_configs:
      - targets: ['product-service:8082']
      metrics_path: '/actuator/prometheus'
```

### Logging with ELK Stack
```yaml
# logging/filebeat.yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: filebeat
spec:
  selector:
    matchLabels:
      name: filebeat
  template:
    spec:
      containers:
      - name: filebeat
        image: docker.elastic.co/beats/filebeat:7.9.0
        volumeMounts:
        - name: config
          mountPath: /usr/share/filebeat/filebeat.yml
        - name: varlog
          mountPath: /var/log
```

---

## 🔐 Security Considerations

### SSL/TLS Configuration
- Use Let's Encrypt for SSL certificates
- Implement HSTS headers
- Configure secure cookie settings

### Network Security
- Use network policies in Kubernetes
- Implement service mesh (Istio) for advanced security
- Configure VPC/firewall rules

### Secrets Management
- Use HashiCorp Vault or cloud-native secret managers
- Rotate secrets regularly
- Implement principle of least privilege

---

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: Build Docker images
      run: |
        docker build -t shopster/frontend:$GITHUB_SHA ./apps/frontend
        docker build -t shopster/product-service:$GITHUB_SHA ./apps/product-service
        
    - name: Push to registry
      run: |
        echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
        docker push shopster/frontend:$GITHUB_SHA
        docker push shopster/product-service:$GITHUB_SHA
        
    - name: Deploy to Kubernetes
      run: |
        kubectl set image deployment/frontend frontend=shopster/frontend:$GITHUB_SHA
        kubectl set image deployment/product-service product-service=shopster/product-service:$GITHUB_SHA
```

---

## 📋 Production Checklist

### Pre-deployment
- [ ] All services pass health checks
- [ ] Database migrations completed
- [ ] SSL certificates configured
- [ ] Monitoring dashboards set up
- [ ] Backup strategy implemented
- [ ] Load testing completed
- [ ] Security scan passed

### Post-deployment
- [ ] Verify all services are running
- [ ] Check application logs
- [ ] Validate database connections
- [ ] Test critical user journeys
- [ ] Monitor performance metrics
- [ ] Verify SSL certificate validity

---

## 🔧 Troubleshooting

### Common Issues

#### Service Not Starting
```bash
# Check pod status
kubectl describe pod <pod-name>

# Check logs
kubectl logs <pod-name> --previous

# Check resource usage
kubectl top pods
```

#### Database Connection Issues
```bash
# Test connectivity
kubectl run -i --tty --rm debug --image=busybox --restart=Never -- nslookup mongodb-service

# Check service endpoints
kubectl get endpoints mongodb-service
```

#### Performance Issues
```bash
# Check resource usage
kubectl top nodes
kubectl top pods

# Scale services
kubectl scale deployment product-service --replicas=5
```

### Support Contacts
- **DevOps Team**: devops@shopster.com
- **On-call Engineer**: +1-555-0123
- **Slack Channel**: #shopster-prod-support