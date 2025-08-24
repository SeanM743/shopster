# Architecture Patterns & Design Principles

This document defines the design patterns, architectural principles, and code organization standards for the ecommerce platform.

## Design Patterns & Principles

### **Backend Patterns**

#### **Repository Pattern**
- **Purpose**: Data access abstraction and testability
- **Implementation**: Spring Data JPA repositories with custom query methods
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.isActive = true")
    List<User> findActiveUsers();
}
```

#### **Service Layer Pattern**
- **Purpose**: Business logic encapsulation and transaction management
- **Implementation**: `@Service` classes with clear responsibilities
```java
@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    public User createUser(CreateUserDto dto) {
        // Business logic implementation
    }
}
```

#### **DTO Pattern**
- **Purpose**: Data transfer objects for API boundaries and validation
- **Implementation**: Separate DTOs for requests, responses, and internal data
```java
public record CreateUserDto(
    @NotBlank @Email String email,
    @NotBlank @Size(min = 8) String password,
    @NotBlank String firstName,
    @NotBlank String lastName
) {}
```

#### **Builder Pattern**
- **Purpose**: Complex object construction with fluent API
- **Implementation**: Lombok `@Builder` or custom builders for domain objects
```java
@Builder
public class Product {
    private String name;
    private BigDecimal price;
    private Category category;
    private List<String> tags;
}
```

#### **Strategy Pattern**
- **Purpose**: Algorithm variations for payment processing, shipping calculations
- **Implementation**: Interface-based strategies with Spring configuration
```java
public interface PricingStrategy {
    BigDecimal calculatePrice(Product product, Customer customer);
}

@Component("standardPricing")
public class StandardPricingStrategy implements PricingStrategy {
    // Implementation
}
```

#### **Observer Pattern**
- **Purpose**: Event-driven architecture and loose coupling
- **Implementation**: Spring Application Events and listeners
```java
@EventListener
public void handleUserRegistered(UserRegisteredEvent event) {
    // Send welcome email, create profile, etc.
}
```

#### **CQRS (Command Query Responsibility Segregation)**
- **Purpose**: Separate read and write models for complex domains
- **Implementation**: Command and Query handlers with different data models

### **Frontend Patterns**

#### **Container/Presenter Pattern**
- **Purpose**: Separation of logic and presentation components
- **Implementation**: Smart containers manage state, dumb components render UI
```typescript
// Container Component
const ProductListContainer: React.FC = () => {
  const { data, loading } = useProducts();
  return <ProductList products={data} loading={loading} />;
};

// Presenter Component  
const ProductList: React.FC<Props> = ({ products, loading }) => {
  return <div>{/* Pure UI rendering */}</div>;
};
```

#### **Custom Hooks Pattern**
- **Purpose**: Reusable stateful logic across components
- **Implementation**: Extract common patterns into custom hooks
```typescript
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  
  const login = useCallback(async (credentials) => {
    // Login logic
  }, []);
  
  return { user, loading, login, logout };
};
```

#### **Compound Components Pattern**
- **Purpose**: Flexible component composition and API design
- **Implementation**: Components that work together with shared context
```typescript
const Modal = ({ children }) => {
  return <ModalProvider>{children}</ModalProvider>;
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;  
Modal.Footer = ModalFooter;
```

#### **Provider Pattern**
- **Purpose**: Context-based state sharing across component trees
- **Implementation**: React Context for global state management
```typescript
const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
```

## Code Organization

### **Backend Structure**
```
src/main/java/com/ecommerce/{service}/
├── config/              # Configuration classes
│   ├── SecurityConfig.java
│   ├── DatabaseConfig.java
│   └── ThreadPoolConfig.java
├── controller/          # REST controllers
│   ├── UserController.java
│   └── dto/            # Request/response DTOs
│       ├── CreateUserDto.java
│       └── UserResponseDto.java
├── entity/             # JPA entities
│   ├── User.java
│   └── audit/         # Audit and base entities
├── exception/          # Custom exceptions
│   ├── UserNotFoundException.java
│   └── GlobalExceptionHandler.java
├── mapper/             # MapStruct mappers
│   └── UserMapper.java
├── repository/         # Data repositories
│   └── UserRepository.java
├── service/            # Business logic
│   ├── UserService.java
│   └── impl/          # Service implementations
└── util/              # Utility classes
    └── DateUtils.java
```

### **Frontend Structure**
```
src/
├── components/         # Reusable UI components
│   ├── ui/            # Base UI components (shadcn)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── modal.tsx
│   └── features/      # Feature-specific components
│       ├── auth/
│       ├── products/
│       └── checkout/
├── hooks/             # Custom React hooks
│   ├── useAuth.ts
│   ├── useProducts.ts
│   └── useLocalStorage.ts
├── lib/               # Utility functions and configurations
│   ├── api.ts         # API client setup
│   ├── auth.ts        # Authentication utilities
│   └── utils.ts       # General utilities
├── pages/             # Page components (route handlers)
│   ├── HomePage.tsx
│   ├── ProductPage.tsx
│   └── CheckoutPage.tsx
├── services/          # API calls and external services
│   ├── userService.ts
│   ├── productService.ts
│   └── types/         # Service-specific types
├── stores/            # State management (Zustand)
│   ├── authStore.ts
│   ├── cartStore.ts
│   └── index.ts
├── types/             # TypeScript type definitions
│   ├── user.ts
│   ├── product.ts
│   └── api.ts
└── utils/             # Helper functions
    ├── formatters.ts
    ├── validators.ts
    └── constants.ts
```

## API Design Standards

### **REST Conventions**
```
GET    /api/v1/users           # List users
GET    /api/v1/users/{id}      # Get specific user
POST   /api/v1/users           # Create user
PUT    /api/v1/users/{id}      # Update user
DELETE /api/v1/users/{id}      # Delete user
PATCH  /api/v1/users/{id}      # Partial update
```

### **Response Format Standards**
```json
// Success Response
{
  "data": {},
  "message": "Success",
  "timestamp": "2024-01-01T00:00:00Z",
  "status": 200
}

// Error Response  
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": ["Field 'name' is required"],
    "path": "/api/v1/users"
  },
  "timestamp": "2024-01-01T00:00:00Z",
  "status": 400
}

// Paginated Response
{
  "data": {
    "content": [],
    "page": 0,
    "size": 20,
    "totalElements": 100,
    "totalPages": 5
  },
  "message": "Success",
  "timestamp": "2024-01-01T00:00:00Z",
  "status": 200
}
```

## Security Patterns

### **Authentication Flow**
```
1. User submits credentials
2. Server validates and generates JWT
3. Client stores JWT in memory/session storage
4. Client includes JWT in Authorization header
5. Server validates JWT on protected routes
6. Refresh token used for token renewal
```

### **Authorization Patterns**
```java
@PreAuthorize("hasRole('USER')")
@GetMapping("/profile")
public ResponseEntity<User> getUserProfile() {
    // Implementation
}

@PreAuthorize("hasRole('ADMIN') or #userId == authentication.principal.id")
@GetMapping("/users/{userId}")
public ResponseEntity<User> getUser(@PathVariable Long userId) {
    // Implementation  
}
```

### **Input Validation**
```java
@PostMapping("/users")
public ResponseEntity<User> createUser(
    @Valid @RequestBody CreateUserDto dto,
    BindingResult result) {
    
    if (result.hasErrors()) {
        throw new ValidationException(result);
    }
    // Implementation
}
```

## Performance Patterns

### **Database Optimization**
```java
// Use JOIN FETCH to avoid N+1 queries
@Query("SELECT u FROM User u JOIN FETCH u.orders WHERE u.id = :userId")
User findUserWithOrders(@Param("userId") Long userId);

// Use projections for read-only queries
public interface UserSummaryProjection {
    String getFirstName();
    String getLastName();
    String getEmail();
}
```

### **Caching Strategies**
```java
@Cacheable(value = "users", key = "#userId")
public User findById(Long userId) {
    return userRepository.findById(userId);
}

@CacheEvict(value = "users", key = "#user.id")
public User updateUser(User user) {
    return userRepository.save(user);
}
```

### **Frontend Performance**
```typescript
// Component memoization
const ProductCard = React.memo(({ product }) => {
  return <div>{product.name}</div>;
});

// Expensive calculations
const ExpensiveComponent = ({ data }) => {
  const processedData = useMemo(() => {
    return heavyCalculation(data);
  }, [data]);
  
  return <div>{processedData}</div>;
};

// Code splitting
const LazyComponent = lazy(() => import('./HeavyComponent'));
```

## Error Handling Patterns

### **Backend Exception Handling**
```java
@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(ValidationException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleValidation(ValidationException ex) {
        return ErrorResponse.builder()
            .code("VALIDATION_ERROR")
            .message(ex.getMessage())
            .details(ex.getFieldErrors())
            .build();
    }
}
```

### **Frontend Error Boundaries**
```typescript
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error} />;
    }
    return this.props.children;
  }
}
```

These patterns ensure consistency, maintainability, and scalability across the ecommerce platform. For specific implementation guidelines, see [Development Standards](development-standards.md).