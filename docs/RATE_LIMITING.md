# Rate Limiting Implementation Guide

## Current Rate Limiting Strategy

Our application implements multi-layered rate limiting using Redis and Spring Boot to prevent abuse and ensure fair API usage.

## Implementation Architecture

### 1. Redis-Based Rate Limiting

#### Dependencies
```xml
<!-- pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-redis</artifactId>
</dependency>
<dependency>
    <groupId>io.github.bucket4j</groupId>
    <artifactId>bucket4j-redis</artifactId>
    <version>8.7.0</version>
</dependency>
```

#### Rate Limiting Service
```java
// RateLimitService.java
@Service
public class RateLimitService {
    
    private final RedisTemplate<String, String> redisTemplate;
    
    public RateLimitService(RedisTemplate<String, String> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }
    
    public boolean isAllowed(String key, int limit, Duration window) {
        String redisKey = "rate_limit:" + key;
        String currentWindow = getCurrentWindow(window);
        String fullKey = redisKey + ":" + currentWindow;
        
        // Get current count
        String countStr = redisTemplate.opsForValue().get(fullKey);
        int currentCount = countStr != null ? Integer.parseInt(countStr) : 0;
        
        if (currentCount >= limit) {
            return false; // Rate limit exceeded
        }
        
        // Increment counter
        redisTemplate.opsForValue().increment(fullKey);
        
        // Set expiration if this is the first request in the window
        if (currentCount == 0) {
            redisTemplate.expire(fullKey, window);
        }
        
        return true;
    }
    
    private String getCurrentWindow(Duration window) {
        long windowSizeMs = window.toMillis();
        long currentTimeMs = System.currentTimeMillis();
        return String.valueOf(currentTimeMs / windowSizeMs);
    }
    
    public RateLimitStatus getRateLimitStatus(String key, int limit, Duration window) {
        String redisKey = "rate_limit:" + key;
        String currentWindow = getCurrentWindow(window);
        String fullKey = redisKey + ":" + currentWindow;
        
        String countStr = redisTemplate.opsForValue().get(fullKey);
        int currentCount = countStr != null ? Integer.parseInt(countStr) : 0;
        
        long ttl = redisTemplate.getExpire(fullKey, TimeUnit.SECONDS);
        
        return RateLimitStatus.builder()
            .allowed(currentCount < limit)
            .requestsRemaining(Math.max(0, limit - currentCount))
            .resetTimeSeconds(ttl)
            .build();
    }
}
```

### 2. Bucket4j Implementation (Token Bucket Algorithm)

#### Configuration
```java
// RateLimitConfig.java
@Configuration
@EnableConfigurationProperties(RateLimitProperties.class)
public class RateLimitConfig {
    
    @Bean
    public ProxyManager<String> proxyManager(LettuceConnectionFactory connectionFactory) {
        return Bucket4jRedis.casBasedBuilder(connectionFactory)
            .build();
    }
    
    @Bean
    public RateLimitingInterceptor rateLimitingInterceptor(
            ProxyManager<String> proxyManager,
            RateLimitProperties properties) {
        return new RateLimitingInterceptor(proxyManager, properties);
    }
}

// Rate limiting properties
@ConfigurationProperties(prefix = "app.rate-limit")
@Data
public class RateLimitProperties {
    private Map<String, RateLimitRule> rules = new HashMap<>();
    
    @Data
    public static class RateLimitRule {
        private int capacity;
        private int refillTokens;
        private Duration refillPeriod;
        private String[] endpoints;
    }
}
```

#### Application Configuration
```yaml
# application.yml
app:
  rate-limit:
    rules:
      default:
        capacity: 100
        refill-tokens: 100
        refill-period: PT1M # 1 minute
        endpoints: ["/**"]
      
      auth:
        capacity: 5
        refill-tokens: 5
        refill-period: PT5M # 5 minutes
        endpoints: ["/api/v1/auth/login", "/api/v1/auth/register"]
      
      search:
        capacity: 50
        refill-tokens: 50
        refill-period: PT1M
        endpoints: ["/api/v1/products/search"]
      
      premium:
        capacity: 1000
        refill-tokens: 1000
        refill-period: PT1M
        endpoints: ["/**"]
```

### 3. Rate Limiting Interceptor

```java
// RateLimitingInterceptor.java
@Component
public class RateLimitingInterceptor implements HandlerInterceptor {
    
    private final ProxyManager<String> proxyManager;
    private final RateLimitProperties rateLimitProperties;
    
    @Override
    public boolean preHandle(HttpServletRequest request, 
                           HttpServletResponse response, 
                           Object handler) throws Exception {
        
        String clientId = getClientIdentifier(request);
        String endpoint = request.getRequestURI();
        RateLimitRule rule = findApplicableRule(endpoint);
        
        if (rule == null) {
            return true; // No rate limiting for this endpoint
        }
        
        Bucket bucket = getBucket(clientId, rule);
        ConsumptionProbe probe = bucket.tryConsumeAndReturnRemaining(1);
        
        if (probe.isConsumed()) {
            // Add rate limit headers
            response.addHeader("X-Rate-Limit-Remaining", 
                String.valueOf(probe.getRemainingTokens()));
            response.addHeader("X-Rate-Limit-Retry-After-Seconds", 
                String.valueOf(probe.getNanosToWaitForRefill() / 1_000_000_000));
            return true;
        } else {
            // Rate limit exceeded
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setContentType("application/json");
            response.getWriter().write(createRateLimitExceededResponse());
            return false;
        }
    }
    
    private Bucket getBucket(String clientId, RateLimitRule rule) {
        String bucketKey = "rate_limit_bucket:" + clientId;
        
        BucketConfiguration configuration = BucketConfiguration.builder()
            .addLimit(Bandwidth.classic(rule.getCapacity(), Refill.intervally(
                rule.getRefillTokens(), rule.getRefillPeriod())))
            .build();
            
        return proxyManager.builder().build(bucketKey, configuration);
    }
    
    private String getClientIdentifier(HttpServletRequest request) {
        // Try JWT user ID first
        String userId = extractUserIdFromJWT(request);
        if (userId != null) {
            return "user:" + userId;
        }
        
        // Fall back to IP address
        return "ip:" + getClientIP(request);
    }
    
    private String getClientIP(HttpServletRequest request) {
        String xForwardedFor = request.getHeader("X-Forwarded-For");
        if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
            return xForwardedFor.split(",")[0].trim();
        }
        
        String xRealIP = request.getHeader("X-Real-IP");
        if (xRealIP != null && !xRealIP.isEmpty()) {
            return xRealIP;
        }
        
        return request.getRemoteAddr();
    }
}
```

### 4. Advanced Rate Limiting Strategies

#### Sliding Window Implementation
```java
// SlidingWindowRateLimit.java
@Service
public class SlidingWindowRateLimit {
    
    private final RedisTemplate<String, String> redisTemplate;
    
    public boolean isAllowed(String key, int limit, Duration window) {
        String redisKey = "sliding_window:" + key;
        long now = System.currentTimeMillis();
        long windowStart = now - window.toMillis();
        
        // Remove old entries
        redisTemplate.opsForZSet().removeRangeByScore(redisKey, 0, windowStart);
        
        // Count current requests
        Long currentCount = redisTemplate.opsForZSet().count(redisKey, windowStart, now);
        
        if (currentCount >= limit) {
            return false;
        }
        
        // Add current request
        redisTemplate.opsForZSet().add(redisKey, UUID.randomUUID().toString(), now);
        
        // Set expiration
        redisTemplate.expire(redisKey, window.plusMinutes(1));
        
        return true;
    }
}
```

#### Distributed Rate Limiting with Circuit Breaker
```java
// DistributedRateLimitService.java
@Service
public class DistributedRateLimitService {
    
    @CircuitBreaker(name = "rate-limit", fallbackMethod = "fallbackRateLimit")
    @Retry(name = "rate-limit")
    @TimeLimiter(name = "rate-limit")
    public CompletableFuture<Boolean> checkRateLimit(String key, int limit, Duration window) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                return rateLimitService.isAllowed(key, limit, window);
            } catch (Exception e) {
                log.warn("Rate limiting service unavailable, allowing request", e);
                return true; // Fail open
            }
        });
    }
    
    public CompletableFuture<Boolean> fallbackRateLimit(String key, int limit, Duration window, Exception ex) {
        log.warn("Rate limiting fallback triggered for key: {}", key, ex);
        return CompletableFuture.completedFuture(true); // Allow when circuit is open
    }
}
```

## Rate Limiting Rules

### Current Implementation

#### 1. Anonymous Users (IP-based)
- **Default API**: 100 requests/minute
- **Search**: 50 requests/minute  
- **Product listings**: 200 requests/minute

#### 2. Authenticated Users
- **Default API**: 1,000 requests/minute
- **Search**: 500 requests/minute
- **Authentication**: 5 attempts/5 minutes

#### 3. Premium Users
- **All APIs**: 5,000 requests/minute
- **Bulk operations**: 100 requests/minute

#### 4. Admin Users
- **No rate limiting** (with monitoring)

### Special Endpoints

#### Authentication Endpoints
```java
// Enhanced security for auth endpoints
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    
    @PostMapping("/login")
    @RateLimit(key = "ip", limit = 5, window = "5m")
    @RateLimit(key = "email", limit = 3, window = "15m") // Per email
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // Login logic
    }
    
    @PostMapping("/password-reset")
    @RateLimit(key = "email", limit = 3, window = "1h")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordResetRequest request) {
        // Password reset logic
    }
}
```

## Monitoring & Alerting

### Rate Limit Metrics
```java
// RateLimitMetrics.java
@Component
public class RateLimitMetrics {
    
    private final MeterRegistry meterRegistry;
    private final Counter rateLimitHits;
    private final Counter rateLimitMisses;
    
    public RateLimitMetrics(MeterRegistry meterRegistry) {
        this.meterRegistry = meterRegistry;
        this.rateLimitHits = Counter.builder("rate_limit_hits")
            .description("Number of requests that exceeded rate limits")
            .register(meterRegistry);
        this.rateLimitMisses = Counter.builder("rate_limit_misses")
            .description("Number of requests that were within rate limits")
            .register(meterRegistry);
    }
    
    public void recordRateLimitHit(String endpoint, String clientType) {
        rateLimitHits.increment(
            Tags.of("endpoint", endpoint, "client_type", clientType)
        );
    }
    
    public void recordRateLimitMiss(String endpoint, String clientType) {
        rateLimitMisses.increment(
            Tags.of("endpoint", endpoint, "client_type", clientType)
        );
    }
}
```

### Alerting Configuration
```yaml
# Prometheus alerts
groups:
- name: rate_limiting
  rules:
  - alert: HighRateLimitHitRate
    expr: rate(rate_limit_hits_total[5m]) > 10
    for: 2m
    labels:
      severity: warning
    annotations:
      summary: "High rate of rate limit violations"
      description: "Rate limit hit rate is {{ $value }} requests/second"
      
  - alert: RateLimitingServiceDown
    expr: up{job="rate-limit-service"} == 0
    for: 1m
    labels:
      severity: critical
    annotations:
      summary: "Rate limiting service is down"
```

## Redis Configuration

### Redis Setup for Rate Limiting
```yaml
# docker-compose.yml
redis:
  image: redis:7-alpine
  ports:
    - "6379:6379"
  volumes:
    - redis_data:/data
  command: redis-server --appendonly yes --maxmemory 256mb --maxmemory-policy allkeys-lru
```

### Redis Configuration
```yaml
# application.yml
spring:
  redis:
    host: localhost
    port: 6379
    timeout: 2000ms
    jedis:
      pool:
        max-active: 8
        max-idle: 8
        min-idle: 0
```

## Testing Rate Limits

### Unit Tests
```java
// RateLimitServiceTest.java
@SpringBootTest
@TestPropertySource(properties = "spring.redis.host=localhost")
class RateLimitServiceTest {
    
    @Autowired
    private RateLimitService rateLimitService;
    
    @Test
    void shouldAllowRequestsWithinLimit() {
        String key = "test-key";
        int limit = 5;
        Duration window = Duration.ofMinutes(1);
        
        for (int i = 0; i < limit; i++) {
            assertTrue(rateLimitService.isAllowed(key, limit, window));
        }
    }
    
    @Test
    void shouldRejectRequestsExceedingLimit() {
        String key = "test-key-exceed";
        int limit = 3;
        Duration window = Duration.ofMinutes(1);
        
        // Use up all allowed requests
        for (int i = 0; i < limit; i++) {
            rateLimitService.isAllowed(key, limit, window);
        }
        
        // Next request should be rejected
        assertFalse(rateLimitService.isAllowed(key, limit, window));
    }
}
```

## Performance Considerations

### Redis Memory Usage
- Each rate limit key: ~100 bytes
- 1M users with active limits: ~100MB Redis memory
- Use TTL to automatically cleanup expired keys
- Monitor memory usage and scale Redis as needed

### Latency Impact
- Redis lookup: ~1-2ms average
- Total rate limiting overhead: ~3-5ms per request
- Use connection pooling to minimize connection overhead
- Consider local caching for frequently accessed limits

## Summary

Our rate limiting solution provides:

1. **Multi-layered protection** - IP and user-based limiting
2. **Flexible configuration** - Different rules for different endpoints
3. **High performance** - Redis-based with minimal latency
4. **Monitoring** - Comprehensive metrics and alerting
5. **Resilience** - Circuit breaker for Redis failures
6. **Security** - Enhanced protection for sensitive endpoints

The system handles both authenticated and anonymous users with appropriate limits based on user type and endpoint sensitivity.