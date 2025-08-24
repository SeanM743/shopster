# Ecommerce Platform

A modular ecommerce platform with separate frontend and backend services.

## Project Structure

```
ecommerce/
├── frontend/          # React TypeScript application
├── backend/           # Main Java backend service (item information)
└── services/          # Microservices
    ├── item-service/      # Item management service
    └── membership-service/ # Customer membership service
```

## Services Overview

### Frontend
- **Technology**: React with TypeScript
- **Purpose**: Main retail website interface
- **Location**: `./frontend/`

### Backend (Item Service)
- **Technology**: Java with Spring Boot
- **Purpose**: Handles item information (quantity, SKU, descriptions, etc.)
- **Location**: `./backend/`

### Future Services

#### Membership Service
- **Technology**: Java with Spring Boot  
- **Purpose**: Customer membership program with shopping and shipping discounts
- **Location**: `./services/membership-service/`

## Getting Started

### Frontend
```bash
cd frontend
npm start
```

### Backend
```bash
cd backend  
mvn spring-boot:run
```

## Development

Each service is designed to be independently deployable and maintainable as a microservice architecture.