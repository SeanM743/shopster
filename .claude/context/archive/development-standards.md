# Development Standards & Conventions

This document defines coding standards, naming conventions, and quality requirements for the ecommerce platform.

## Naming Conventions

### **Java Backend**
- **Classes**: PascalCase (`UserService`, `ProductRepository`)
- **Methods**: camelCase (`findById`, `createUser`)
- **Variables**: camelCase (`userId`, `productName`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`, `DEFAULT_PAGE_SIZE`)
- **Packages**: lowercase with dots (`com.ecommerce.userservice`)
- **Enums**: PascalCase with UPPER_CASE values (`UserRole.ADMIN`)

### **TypeScript Frontend**
- **Components**: PascalCase (`ProductCard`, `UserProfile`) - leveraging shadcn/ui for base components
- **Functions**: camelCase (`getUserById`, `formatPrice`)
- **Variables**: camelCase (`userEmail`, `isLoading`)
- **Constants**: UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_RETRIES`)
- **Types/Interfaces**: PascalCase (`User`, `ApiResponse`)
- **Files**: kebab-case (`user-profile.tsx`, `api-client.ts`)

### **API Endpoints**
- **RESTful Conventions**: `/api/v1/users`, `/api/v1/products/{id}`
- **Resource Names**: Plural nouns (`users`, `products`, `orders`)
- **Path Parameters**: kebab-case (`/users/{user-id}/orders`)
- **Query Parameters**: snake_case (`?page_size=20&sort_by=created_at`)

### **Database**
- **Tables**: snake_case (`users`, `product_categories`)
- **Columns**: snake_case (`user_id`, `created_at`, `first_name`)
- **Indexes**: `idx_{table}_{column}` (`idx_users_email`)
- **Constraints**: `{type}_{table}_{column}` (`uk_users_email`, `fk_orders_user_id`)

## Code Quality Standards

### **Clean Code Principles**

#### **Functions and Methods**
- **Single Responsibility**: Each function does one thing well
- **Small Functions**: Maximum 20-30 lines per function
- **Descriptive Names**: Names explain what the function does
- **Minimal Parameters**: Maximum 3-4 parameters, use objects for more
- **No Side Effects**: Pure functions when possible

#### **Classes and Components**
- **Single Responsibility Principle**: One reason to change
- **Open/Closed Principle**: Open for extension, closed for modification
- **Dependency Inversion**: Depend on abstractions, not concretions
- **Composition over Inheritance**: Prefer composition patterns

### **Documentation Standards**

#### **Java Documentation**
```java
/**
 * Creates a new user account with the provided information.
 * 
 * @param createUserDto the user information for account creation
 * @return the created user with generated ID and timestamps
 * @throws UserAlreadyExistsException if user with email already exists
 * @throws ValidationException if user data is invalid
 */
public User createUser(CreateUserDto createUserDto) {
    // Implementation
}
```

#### **TypeScript Documentation**
```typescript
/**
 * Custom hook for managing user authentication state
 * 
 * @returns Object containing user data, loading state, and auth functions
 * @example
 * const { user, loading, login, logout } = useAuth();
 */
export const useAuth = () => {
    // Implementation
};
```

### **Error Handling Standards**

#### **Backend Error Handling**
```java
// Use specific exception types
public User findUserById(Long id) {
    return userRepository.findById(id)
        .orElseThrow(() -> new UserNotFoundException("User not found with id: " + id));
}

// Global exception handler
@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorResponse handleUserNotFound(UserNotFoundException ex) {
        return new ErrorResponse("USER_NOT_FOUND", ex.getMessage());
    }
}
```

#### **Frontend Error Handling**
```typescript
// Error boundaries for React components
<ErrorBoundary fallback={<ErrorFallback />}>
  <UserProfile />
</ErrorBoundary>

// Async error handling with try-catch
const fetchUser = async (id: string) => {
  try {
    const user = await userService.getById(id);
    return user;
  } catch (error) {
    if (error instanceof ApiError) {
      toast.error(error.message);
    } else {
      toast.error('An unexpected error occurred');
    }
    throw error;
  }
};
```

### **HTTP Status Code Usage**
```
200 OK          - Successful GET, PUT, PATCH
201 Created     - Successful POST with resource creation
204 No Content  - Successful DELETE or PUT without response body
400 Bad Request - Invalid input data or malformed request
401 Unauthorized - Authentication required or failed
403 Forbidden   - Authorization failed
404 Not Found   - Resource doesn't exist
409 Conflict    - Resource conflict (duplicate email, etc.)
422 Unprocessable Entity - Valid request but business logic error
500 Internal Server Error - Unexpected server error
```

## Security Standards

### **Input Validation**
```java
// Always validate input at controller level
@PostMapping("/users")
public ResponseEntity<User> createUser(@Valid @RequestBody CreateUserDto dto) {
    // Validation handled by @Valid annotation
}

// Custom validation for complex rules
@Component
public class UserValidator {
    public void validateCreateUser(CreateUserDto dto) {
        if (userRepository.existsByEmail(dto.email())) {
            throw new ValidationException("Email already exists");
        }
    }
}
```

### **Password Security**
```java
@Configuration
public class SecurityConfig {
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(12); // 12 rounds for strong security
    }
}

// Never log or expose passwords
public class UserService {
    public User createUser(CreateUserDto dto) {
        String hashedPassword = passwordEncoder.encode(dto.password());
        // Store hashed password, never plain text
    }
}
```

### **Authentication & Authorization**
```java
// JWT Configuration
@Component
public class JwtTokenProvider {
    private final String secretKey = "${jwt.secret}"; // From environment variables
    private final long validityInMilliseconds = 3600000; // 1 hour
    
    public String createToken(UserDetails userDetails) {
        // JWT creation logic
    }
}

// Method-level security
@PreAuthorize("hasRole('ADMIN') or #userId == authentication.principal.id")
public User getUserById(Long userId) {
    // Implementation
}
```

### **CORS Configuration**
```java
@Configuration
public class CorsConfig {
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(List.of("https://*.yourdomain.com"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);
        return source;
    }
}
```

## Performance Standards

### **Database Performance**
```java
// Use appropriate fetch strategies
@Entity
public class User {
    @OneToMany(fetch = FetchType.LAZY) // Lazy by default
    private List<Order> orders;
}

// Optimize queries with projections
public interface UserSummary {
    String getFirstName();
    String getLastName();
    String getEmail();
}

@Query("SELECT u.firstName as firstName, u.lastName as lastName, u.email as email FROM User u")
List<UserSummary> findAllUserSummaries();

// Use pagination for large datasets
@Query("SELECT u FROM User u ORDER BY u.createdAt DESC")
Page<User> findAllUsers(Pageable pageable);
```

### **Frontend Performance**
```typescript
// Component optimization
const ProductList = React.memo(({ products }) => {
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
});

// Expensive calculations
const useProductStats = (products: Product[]) => {
  return useMemo(() => {
    return {
      totalCount: products.length,
      averagePrice: products.reduce((sum, p) => sum + p.price, 0) / products.length,
      categories: [...new Set(products.map(p => p.category))]
    };
  }, [products]);
};

// Code splitting for large components
const HeavyComponent = lazy(() => import('./HeavyComponent'));
```

## Testing Standards

### **Backend Testing**
```java
// Unit test example
@ExtendWith(MockitoExtension.class)
class UserServiceTest {
    
    @Mock
    private UserRepository userRepository;
    
    @InjectMocks
    private UserService userService;
    
    @Test
    void createUser_WithValidData_ReturnsUser() {
        // Given
        CreateUserDto dto = new CreateUserDto("test@example.com", "password123", "John", "Doe");
        User expectedUser = User.builder()
            .email(dto.email())
            .firstName(dto.firstName())
            .build();
        
        when(userRepository.save(any(User.class))).thenReturn(expectedUser);
        
        // When
        User result = userService.createUser(dto);
        
        // Then
        assertThat(result.getEmail()).isEqualTo("test@example.com");
        verify(userRepository).save(any(User.class));
    }
}

// Integration test example
@SpringBootTest
@Testcontainers
class UserRepositoryIntegrationTest {
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
            .withDatabaseName("testdb")
            .withUsername("test")
            .withPassword("test");
            
    @Test
    void findByEmail_ExistingUser_ReturnsUser() {
        // Test implementation
    }
}
```

### **Frontend Testing**
```typescript
// Component test example
describe('UserProfile', () => {
  it('displays user information correctly', async () => {
    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com'
    };
    
    render(<UserProfile user={mockUser} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
  
  it('handles loading state', () => {
    render(<UserProfile user={null} loading={true} />);
    
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});

// Hook test example
describe('useAuth', () => {
  it('returns initial state correctly', () => {
    const { result } = renderHook(() => useAuth());
    
    expect(result.current.user).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});
```

### **Test Coverage Requirements**
- **Backend Services**: Minimum 85% line coverage
- **Frontend Components**: Minimum 80% line coverage
- **Integration Tests**: All API endpoints covered
- **E2E Tests**: Critical user flows covered

## Code Review Guidelines

### **Review Checklist**
- [ ] **Functionality**: Code works as intended
- [ ] **Performance**: No obvious performance issues
- [ ] **Security**: No security vulnerabilities
- [ ] **Testing**: Adequate test coverage
- [ ] **Documentation**: Code is well-documented
- [ ] **Standards**: Follows naming and coding conventions
- [ ] **Architecture**: Adheres to established patterns

### **Review Process**
1. **Automated Checks**: Linting, formatting, tests pass
2. **Manual Review**: Logic, architecture, security
3. **Testing**: Verify functionality works
4. **Documentation**: Update relevant documentation
5. **Approval**: Two approvals required for main branch

## Logging Standards

### **Structured Logging**
```java
// Use SLF4J with structured format
@Slf4j
@Service
public class UserService {
    
    public User createUser(CreateUserDto dto) {
        log.info("Creating user with email: {}", dto.email());
        
        try {
            User user = userRepository.save(buildUser(dto));
            log.info("User created successfully with id: {}", user.getId());
            return user;
        } catch (Exception e) {
            log.error("Failed to create user with email: {}", dto.email(), e);
            throw new UserCreationException("Unable to create user", e);
        }
    }
}
```

### **Log Levels**
- **TRACE**: Very detailed information, typically only enabled in development
- **DEBUG**: General debugging information
- **INFO**: Important business events and state changes
- **WARN**: Potentially harmful situations or unexpected behavior
- **ERROR**: Error events that might allow the application to continue

## MCP Server Integration Standards

### **Available MCP Servers**
The Shopster platform integrates with several Model Context Protocol servers to enhance development capabilities:

#### **Database Operations**
- **PostgreSQL MCP**: Use `postgres mcp` for direct database queries, schema inspection, and data operations
```bash
# Example usage in development
Use postgres mcp to connect to shopster_users database and show table structure
Use postgres mcp to query users table for authentication testing
```

#### **Version Control Operations**
- **GitHub MCP**: Use `github mcp` for repository operations, issue management, and PR workflows
```bash
# Example usage
Use github mcp to create a new branch for feature development
Use github mcp to review pull requests and check CI status
```

#### **File System Operations**
- **Filesystem MCP**: Use `filesystem mcp` for advanced file operations beyond basic file editing
```bash
# Example usage  
Use filesystem mcp to search for files matching specific patterns
Use filesystem mcp to perform bulk file operations across directories
```

#### **Web Research & Documentation**
- **Brave Search MCP**: Use `brave-search mcp` for researching solutions, documentation, and best practices
```bash
# Example usage
Use brave-search mcp to find latest Spring Boot security practices
Use brave-search mcp to research React performance optimization techniques
```

### **MCP Server Usage Guidelines**

#### **Database Development**
- **Schema Changes**: Use PostgreSQL MCP to validate schema changes before migration
- **Data Validation**: Query databases directly to verify data integrity
- **Performance Analysis**: Use MCP to analyze query performance and optimize indexes
- **Testing**: Validate test data setup and cleanup using direct database access

#### **Version Control Workflow**
- **Branch Management**: Use GitHub MCP to create and manage feature branches
- **Code Review**: Leverage GitHub MCP to review code changes and CI status
- **Issue Tracking**: Link development work to GitHub issues using MCP integration
- **Release Management**: Coordinate releases and deployments through GitHub workflows

#### **Development Environment**
- **File Operations**: Use Filesystem MCP for complex file manipulations and searches
- **Configuration Management**: Manage environment files and configurations
- **Log Analysis**: Search and analyze application logs efficiently
- **Code Generation**: Template creation and code scaffolding operations

### **Environment Configuration Standards**

#### **.env File Management**
All sensitive configuration must be managed through environment variables:

```bash
# Copy template and configure for your environment
cp .env.template .env
# Edit .env with your actual values - NEVER commit this file
```

#### **Required Environment Variables**
- **Database Connections**: PostgreSQL and MongoDB credentials
- **JWT Secrets**: Secure keys for authentication tokens
- **External APIs**: GitHub tokens, email service credentials
- **Service URLs**: Backend service endpoints and timeouts
- **Feature Flags**: Environment-specific feature toggles

#### **Security Standards for Environment Variables**
```bash
# Use strong secrets (256-bit for JWT)
JWT_SECRET=$(openssl rand -base64 32)

# Rotate secrets regularly in production
# Use different secrets for each environment
# Never hardcode secrets in application code
```

#### **MCP Server Environment Configuration**
```bash
# Configure MCP servers with environment-specific settings
POSTGRES_URL=${POSTGRES_URL}  # Used by PostgreSQL MCP
GITHUB_TOKEN=${GITHUB_TOKEN}  # Used by GitHub MCP
```

### **Development Workflow with MCP Servers**

#### **Feature Development Process**
1. **Research Phase**: Use Brave Search MCP to research implementation approaches
2. **Database Design**: Use PostgreSQL MCP to design and validate schema changes
3. **Implementation**: Use Filesystem MCP for code generation and file operations
4. **Testing**: Use PostgreSQL MCP to validate data operations and test scenarios
5. **Code Review**: Use GitHub MCP to manage pull requests and review process
6. **Deployment**: Use GitHub MCP to coordinate deployment workflows

#### **Debugging and Troubleshooting**
- **Database Issues**: Use PostgreSQL MCP to directly query and analyze data
- **File System Problems**: Use Filesystem MCP to investigate file permissions and structures
- **Version Control Issues**: Use GitHub MCP to examine repository state and history
- **Research Solutions**: Use Brave Search MCP to find solutions to specific problems

#### **Quality Assurance with MCP Servers**
- **Data Validation**: PostgreSQL MCP for direct database integrity checks
- **File Integrity**: Filesystem MCP for verifying file structures and permissions
- **Documentation**: Brave Search MCP for finding best practices and standards
- **Repository Health**: GitHub MCP for analyzing repository metrics and health

### **Security Considerations for MCP Servers**

#### **Access Control**
- Configure MCP servers with minimal required permissions
- Use environment variables for sensitive configuration
- Regularly rotate access tokens and credentials
- Monitor MCP server usage for unauthorized access

#### **Data Protection**
- Never expose database credentials through MCP operations
- Use read-only database connections when possible
- Sanitize query inputs to prevent injection attacks
- Log MCP operations for security auditing

This enhanced development environment with MCP server integration provides powerful capabilities for database operations, version control, file management, and research while maintaining security and best practices.

These standards ensure consistent, maintainable, and high-quality code across the ecommerce platform. For specific patterns and architectural guidance, see [Architecture Patterns](architecture-patterns.md).