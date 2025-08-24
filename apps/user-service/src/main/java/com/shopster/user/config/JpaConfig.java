package com.shopster.user.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * JPA configuration for entity auditing
 */
@Configuration
@EnableJpaAuditing
public class JpaConfig {
}