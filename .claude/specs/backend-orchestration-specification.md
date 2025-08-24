# Backend Orchestration Service Specification

This document defines the Spring MVC orchestration layer that serves as the Backend for Frontend (BFF) pattern, coordinating data flow between the React frontend and various data provider services.

## Architecture Overview

### **Service Layer Design**
```
┌─────────────────────────────────────────────────────────────┐
│                    React Frontend                           │
│              (Port 3000 - Development)                     │
└─────────────────┬───────────────────────────────────────────┘
                  │ HTTP/REST API Calls
                  │
┌─────────────────▼───────────────────────────────────────────┐
│              Spring MVC Orchestration Layer                │
│                   (Port 8080)                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────┐    │
│  │ Home Page   │ │ Product     │ │ User Management     │    │
│  │ Controller  │ │ Controller  │ │ Controller          │    │
│  └─────────────┘ └─────────────┘ └─────────────────────┘    │
└─────────────────┬───────────┬─────────────┬─────────────────┘
                  │           │             │
         ┌────────▼──────┐ ┌──▼────────┐ ┌──▼──────────────┐
         │ User Store    │ │ Product   │ │ Membership Store│
         │ Service       │ │ Store     │ │ (Future)        │
         │ (Port 8081)   │ │ Service   │ │ (Port 8083)     │
         │               │ │(Port 8082)│ │                 │
         └───────────────┘ └───────────┘ └─────────────────┘
```

## Orchestration Service Responsibilities

### **Core Functions**
- **API Gateway**: Single entry point for frontend requests
- **Data Aggregation**: Combine data from multiple backend services
- **Response Transformation**: Format data for frontend consumption
- **Error Handling**: Unified error responses across all endpoints
- **Authentication Orchestration**: Handle user sessions and authorization
- **Caching**: Implement response caching for performance

### **Service Boundaries**
- **Frontend Interface**: REST API endpoints for UI components
- **Backend Integration**: Service-to-service communication with data providers
- **Cross-Cutting Concerns**: Logging, monitoring, security, rate limiting

## API Endpoint Specifications

### **Homepage Endpoints**

#### **GET /api/v1/homepage/hero-content**
```json
{
  "data": {
    "cards": [
      {
        "id": "hero-1",
        "title": "Summer Sale",
        "subtitle": "Up to 50% off selected items",
        "backgroundImage": "https://cdn.shopster.com/hero/summer-sale.jpg",
        "ctaText": "Shop Now",
        "ctaLink": "/categories/sale",
        "priority": 1
      }
    ]
  },
  "status": 200,
  "message": "Success"
}
```

#### **GET /api/v1/homepage/product-carousel/{carouselType}**
**Path Parameters**: `carouselType` ∈ {`featured`, `trending`, `recommended`}

```json
{
  "data": {
    "title": "Featured Products",
    "products": [
      {
        "id": "prod-123",
        "name": "Premium Wireless Headphones",
        "price": 199.99,
        "salePrice": 149.99,
        "image": "https://cdn.shopster.com/products/headphones-123.jpg",
        "rating": 4.5,
        "reviewCount": 1247,
        "inStock": true,
        "badge": "sale"
      }
    ],
    "viewAllLink": "/products?category=featured"
  },
  "status": 200
}
```

#### **GET /api/v1/homepage/footer-banners**
```json
{
  "data": {
    "banners": [
      {
        "id": "footer-1",
        "type": "promotion",
        "title": "Free Shipping",
        "message": "On orders over $50",
        "ctaText": "Learn More",
        "ctaLink": "/shipping-info"
      }
    ]
  },
  "status": 200
}
```

### **Product Detail Endpoints**

#### **GET /api/v1/products/{productId}**
```json
{
  "data": {
    "product": {
      "id": "prod-123",
      "name": "Premium Wireless Headphones",
      "brand": "AudioTech",
      "description": "High-quality wireless headphones with noise cancellation",
      "price": 199.99,
      "salePrice": 149.99,
      "images": [
        {
          "url": "https://cdn.shopster.com/products/headphones-123-main.jpg",
          "alt": "Premium Wireless Headphones - Main View",
          "isPrimary": true
        },
        {
          "url": "https://cdn.shopster.com/products/headphones-123-side.jpg",
          "alt": "Premium Wireless Headphones - Side View",
          "isPrimary": false
        }
      ],
      "specifications": {
        "color": "Midnight Black",
        "weight": "250g",
        "batteryLife": "30 hours",
        "connectivity": "Bluetooth 5.0"
      },
      "inventory": {
        "inStock": true,
        "quantity": 45,
        "lowStockThreshold": 10
      },
      "rating": {
        "average": 4.5,
        "count": 1247
      },
      "shipping": {
        "freeShipping": true,
        "estimatedDays": "2-3 business days"
      }
    }
  },
  "status": 200
}
```

## Data Provider Integration

### **User Store Service (Port 8081)**
- **Purpose**: User authentication, profiles, preferences
- **Endpoints Used**:
  - `GET /users/{userId}/profile` - User profile information
  - `GET /users/{userId}/preferences` - Personalization data
  - `POST /users/authenticate` - User authentication

### **Product Store Service (Port 8082)**  
- **Purpose**: Product catalog, inventory, pricing
- **Endpoints Used**:
  - `GET /products?category={category}&limit={limit}` - Product lists
  - `GET /products/{productId}` - Product details
  - `GET /products/featured` - Featured products
  - `GET /products/trending` - Trending products

### **Membership Store Service (Port 8083) - Future**
- **Purpose**: Membership tiers, benefits, discounts
- **Endpoints Used**:
  - `GET /members/{userId}/benefits` - Member benefits
  - `POST /members/{userId}/apply-discount` - Discount calculations

## Controller Implementation Specifications

### **Homepage Controller**
```java
@RestController
@RequestMapping("/api/v1/homepage")
@Validated
public class HomepageController {
    
    private final ProductStoreClient productStoreClient;
    private final UserStoreClient userStoreClient;
    private final ContentManagementService contentService;
    
    @GetMapping("/hero-content")
    public ResponseEntity<ApiResponse<HeroContentDto>> getHeroContent() {
        // Fetch hero content from CMS or database
        // Transform for frontend consumption
        // Apply any personalization based on user context
    }
    
    @GetMapping("/product-carousel/{carouselType}")
    public ResponseEntity<ApiResponse<ProductCarouselDto>> getProductCarousel(
        @PathVariable String carouselType,
        @RequestParam(defaultValue = "10") int limit) {
        
        // Delegate to appropriate product store endpoint
        // Apply business logic for featured/trending/recommended
        // Transform response format
    }
}
```

### **Product Controller**
```java
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    
    private final ProductStoreClient productStoreClient;
    private final UserStoreClient userStoreClient;
    
    @GetMapping("/{productId}")
    public ResponseEntity<ApiResponse<ProductDetailDto>> getProductDetail(
        @PathVariable String productId,
        @RequestHeader(value = "Authorization", required = false) String authToken) {
        
        // Fetch product details from product store
        // Enrich with user-specific data (if authenticated)
        // Apply pricing rules and availability
        // Format response for frontend
    }
}
```

## Error Handling & Response Format

### **Standard Response Wrapper**
```java
public class ApiResponse<T> {
    private T data;
    private String message;
    private int status;
    private String timestamp;
    private ErrorDetails error; // Only present for error responses
}
```

### **Error Response Format**
```json
{
  "error": {
    "code": "PRODUCT_NOT_FOUND",
    "message": "Product with ID 'prod-999' not found",
    "details": [],
    "path": "/api/v1/products/prod-999"
  },
  "status": 404,
  "timestamp": "2024-08-23T14:30:00Z"
}
```

## Performance & Caching Strategy

### **Response Caching**
- **Hero Content**: 15 minutes TTL (content changes infrequently)
- **Product Carousels**: 5 minutes TTL (balance freshness with performance)
- **Product Details**: 2 minutes TTL (pricing and inventory changes)
- **Static Content**: 1 hour TTL (footer banners, promotional content)

### **Circuit Breaker Pattern**
```java
@Component
public class ProductStoreClient {
    
    @CircuitBreaker(name = "product-store", fallbackMethod = "getProductFallback")
    @Retry(name = "product-store")
    public ProductDto getProduct(String productId) {
        // Call to product store service
    }
    
    public ProductDto getProductFallback(String productId, Exception ex) {
        // Return cached or default product data
    }
}
```

## Security Implementation

### **Authentication Flow**
1. Frontend sends JWT token in Authorization header
2. Orchestration service validates token with User Store
3. User context enriches requests to data providers
4. Personalized responses returned to frontend

### **Request Validation**
```java
@GetMapping("/product-carousel/{carouselType}")
public ResponseEntity<ApiResponse<ProductCarouselDto>> getProductCarousel(
    @PathVariable @Pattern(regexp = "featured|trending|recommended") String carouselType,
    @RequestParam @Min(1) @Max(50) int limit) {
    // Implementation
}
```

## Monitoring & Observability

### **Health Checks**
- **Internal Health**: Spring Boot Actuator endpoints
- **Dependency Health**: Monitor connectivity to all data provider services
- **Custom Metrics**: Response times, error rates, cache hit rates

### **Distributed Tracing**
- **Correlation IDs**: Track requests across all service boundaries
- **Service Mapping**: Understand data flow and dependencies
- **Performance Monitoring**: Identify bottlenecks in orchestration layer

This orchestration service provides a clean abstraction layer that simplifies frontend development while maintaining flexibility for backend service evolution.