# Security & Authentication Guide

## Password Authentication Strategy

### Option 1: Passwordless Authentication (Recommended)

#### OAuth 2.0 + OIDC Integration
```java
// SecurityConfig.java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(userInfo -> userInfo
                    .userService(customOAuth2UserService()))
            )
            .oauth2ResourceServer(OAuth2ResourceServerConfigurer::jwt);
        return http.build();
    }
}
```

#### Magic Link Authentication
```java
// MagicLinkService.java
@Service
public class MagicLinkService {
    
    public void sendMagicLink(String email) {
        String token = generateSecureToken();
        
        // Store token with expiry (10 minutes)
        redisTemplate.opsForValue().set(
            "magic-link:" + token, 
            email, 
            Duration.ofMinutes(10)
        );
        
        String magicLink = "https://shopster.com/auth/verify?token=" + token;
        emailService.sendMagicLink(email, magicLink);
    }
    
    private String generateSecureToken() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }
}
```

### Option 2: Secure Password Storage (If Required)

#### BCrypt with High Cost Factor
```java
// PasswordEncoder configuration
@Configuration
public class PasswordConfig {
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        // Use cost factor of 12-15 for production
        return new BCryptPasswordEncoder(12);
    }
}

// User Service
@Service
public class UserService {
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    public User createUser(CreateUserRequest request) {
        String hashedPassword = passwordEncoder.encode(request.getPassword());
        
        User user = User.builder()
            .email(request.getEmail())
            .passwordHash(hashedPassword)  // Never store plain passwords
            .salt(generateSalt())          // Additional salt layer
            .build();
            
        return userRepository.save(user);
    }
    
    private String generateSalt() {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[16];
        random.nextBytes(salt);
        return Base64.getEncoder().encodeToString(salt);
    }
}
```

#### Argon2id (Military-Grade Alternative)
```java
// Even more secure than BCrypt
@Bean
public PasswordEncoder argon2PasswordEncoder() {
    return new Argon2PasswordEncoder(16, 32, 1, 4096, 3);
}
```

### Multi-Factor Authentication (MFA)

#### TOTP Implementation
```java
// TOTPService.java
@Service
public class TOTPService {
    
    public String generateSecret() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[20];
        random.nextBytes(bytes);
        return new String(Base32.encode(bytes));
    }
    
    public boolean verifyTOTP(String secret, String userCode) {
        long timeWindow = System.currentTimeMillis() / 30000;
        
        for (int i = -1; i <= 1; i++) {
            String expectedCode = generateTOTP(secret, timeWindow + i);
            if (userCode.equals(expectedCode)) {
                return true;
            }
        }
        return false;
    }
}
```

### JWT Security Configuration

#### Secure JWT Implementation
```java
// JwtService.java
@Service
public class JwtService {
    
    @Value("${jwt.secret}")
    private String jwtSecret;
    
    @Value("${jwt.expiration:900}") // 15 minutes
    private int jwtExpiration;
    
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", userDetails.getAuthorities());
        claims.put("iat", Instant.now().getEpochSecond());
        
        return Jwts.builder()
            .setClaims(claims)
            .setSubject(userDetails.getUsername())
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration * 1000))
            .signWith(getSigningKey(), SignatureAlgorithm.HS512)
            .compact();
    }
    
    private Key getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
```

#### Refresh Token Strategy
```java
// RefreshTokenService.java
@Service
public class RefreshTokenService {
    
    public RefreshToken createRefreshToken(String email) {
        RefreshToken refreshToken = RefreshToken.builder()
            .userEmail(email)
            .token(UUID.randomUUID().toString())
            .expiryDate(Instant.now().plus(7, ChronoUnit.DAYS)) // 7 days
            .build();
            
        return refreshTokenRepository.save(refreshToken);
    }
    
    public void rotateRefreshToken(String oldToken) {
        RefreshToken existing = refreshTokenRepository.findByToken(oldToken)
            .orElseThrow(() -> new SecurityException("Invalid refresh token"));
            
        // Invalidate old token
        refreshTokenRepository.delete(existing);
        
        // Create new token
        createRefreshToken(existing.getUserEmail());
    }
}
```

## Data Encryption

### Database Encryption

#### Field-Level Encryption
```java
// Encrypt sensitive fields
@Entity
public class User {
    @Id
    private String id;
    
    @Column
    private String email;
    
    @Convert(converter = EncryptedStringConverter.class)
    @Column(name = "encrypted_data")
    private String sensitiveData;
}

// Encryption converter
@Converter
public class EncryptedStringConverter implements AttributeConverter<String, String> {
    
    @Autowired
    private EncryptionService encryptionService;
    
    @Override
    public String convertToDatabaseColumn(String attribute) {
        return encryptionService.encrypt(attribute);
    }
    
    @Override
    public String convertToEntityAttribute(String dbData) {
        return encryptionService.decrypt(dbData);
    }
}
```

#### Encryption Service
```java
@Service
public class EncryptionService {
    
    @Value("${encryption.key}")
    private String encryptionKey;
    
    public String encrypt(String plaintext) {
        try {
            Cipher cipher = Cipher.getInstance("AES/GCM/NoPadding");
            
            byte[] key = Base64.getDecoder().decode(encryptionKey);
            SecretKeySpec keySpec = new SecretKeySpec(key, "AES");
            
            // Generate random IV for each encryption
            byte[] iv = new byte[12];
            SecureRandom.getInstanceStrong().nextBytes(iv);
            GCMParameterSpec gcmSpec = new GCMParameterSpec(128, iv);
            
            cipher.init(Cipher.ENCRYPT_MODE, keySpec, gcmSpec);
            byte[] ciphertext = cipher.doFinal(plaintext.getBytes(StandardCharsets.UTF_8));
            
            // Prepend IV to ciphertext
            byte[] encrypted = new byte[iv.length + ciphertext.length];
            System.arraycopy(iv, 0, encrypted, 0, iv.length);
            System.arraycopy(ciphertext, 0, encrypted, iv.length, ciphertext.length);
            
            return Base64.getEncoder().encodeToString(encrypted);
        } catch (Exception e) {
            throw new EncryptionException("Encryption failed", e);
        }
    }
}
```

### Secrets Management

#### HashiCorp Vault Integration
```java
// VaultConfig.java
@Configuration
@EnableVault
public class VaultConfig extends AbstractVaultConfiguration {
    
    @Override
    public VaultEndpoint vaultEndpoint() {
        return VaultEndpoint.create(
            environment.getProperty("vault.host", "localhost"),
            Integer.parseInt(environment.getProperty("vault.port", "8200"))
        );
    }
    
    @Override
    public ClientAuthentication clientAuthentication() {
        return new TokenAuthentication(
            environment.getProperty("vault.token")
        );
    }
}

// Using Vault secrets
@Service
public class DatabaseConfig {
    
    @VaultPropertySource(value = "secret/shopster/database")
    public class DatabaseProperties {
        @Value("${database.password}")
        private String password;
        
        @Value("${database.encryption.key}")
        private String encryptionKey;
    }
}
```

#### AWS Secrets Manager
```java
// SecretsService.java
@Service
public class SecretsService {
    
    private final AWSSecretsManager secretsClient;
    
    @Cacheable(value = "secrets", unless = "#result == null")
    public String getSecret(String secretName) {
        GetSecretValueRequest request = new GetSecretValueRequest()
            .withSecretId(secretName);
            
        GetSecretValueResult result = secretsClient.getSecretValue(request);
        return result.getSecretString();
    }
}
```

## Security Headers & HTTPS

### Security Configuration
```java
@Configuration
public class SecurityHeadersConfig {
    
    @Bean
    public SecurityFilterChain securityHeaders(HttpSecurity http) throws Exception {
        http.headers(headers -> headers
            .contentTypeOptions(ContentTypeOptionsConfig::and)
            .frameOptions(FrameOptionsConfig::deny)
            .httpStrictTransportSecurity(hstsConfig -> hstsConfig
                .maxAgeInSeconds(31536000)
                .includeSubdomains(true)
                .preload(true)
            )
            .and()
            .addHeaderWriter(new StaticHeadersWriter(
                "Content-Security-Policy", 
                "default-src 'self'; script-src 'self' 'unsafe-inline'"
            ))
        );
        return http.build();
    }
}
```

## Compliance & Auditing

### GDPR Compliance
```java
// Data retention policy
@Scheduled(cron = "0 0 2 * * ?") // Daily at 2 AM
public void cleanupExpiredData() {
    LocalDateTime cutoff = LocalDateTime.now().minus(2, ChronoUnit.YEARS);
    
    // Delete user data after retention period
    userRepository.deleteInactiveUsersBefore(cutoff);
    
    // Anonymize transaction data
    transactionService.anonymizeOldTransactions(cutoff);
}

// Right to be forgotten
@Service
public class GDPRService {
    
    @Transactional
    public void deleteUserData(String userId) {
        // Pseudonymize instead of delete for transaction integrity
        userRepository.pseudonymizeUser(userId);
        userProfileRepository.deleteByUserId(userId);
        userPreferencesRepository.deleteByUserId(userId);
        
        // Audit trail
        auditService.recordDataDeletion(userId, "GDPR_REQUEST");
    }
}
```

### Security Audit Logging
```java
@EventListener
public class SecurityEventListener {
    
    @EventListener
    public void handleAuthenticationSuccess(AuthenticationSuccessEvent event) {
        auditService.logSecurityEvent(
            SecurityEvent.builder()
                .type("AUTHENTICATION_SUCCESS")
                .username(event.getAuthentication().getName())
                .timestamp(Instant.now())
                .ipAddress(getClientIP())
                .build()
        );
    }
    
    @EventListener
    public void handleAuthenticationFailure(AbstractAuthenticationFailureEvent event) {
        auditService.logSecurityEvent(
            SecurityEvent.builder()
                .type("AUTHENTICATION_FAILURE")
                .username(event.getAuthentication().getName())
                .reason(event.getException().getMessage())
                .timestamp(Instant.now())
                .ipAddress(getClientIP())
                .build()
        );
    }
}
```

## Recommendations

### Security Best Practices
1. **Never store plain passwords** - Always use BCrypt/Argon2
2. **Implement MFA** - TOTP or SMS-based
3. **Use short-lived JWT tokens** - 15 minutes max
4. **Implement refresh token rotation**
5. **Encrypt sensitive data at rest**
6. **Use HTTPS everywhere** - TLS 1.3 minimum
7. **Implement proper session management**
8. **Regular security audits and penetration testing**
9. **Secrets in external key management systems**
10. **Implement rate limiting and brute force protection**