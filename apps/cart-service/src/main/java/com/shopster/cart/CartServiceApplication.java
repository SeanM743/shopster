package com.shopster.cart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;

/**
 * Main application class for Shopster Cart Service
 */
@SpringBootApplication
@EnableRedisRepositories
public class CartServiceApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(CartServiceApplication.class, args);
    }
}