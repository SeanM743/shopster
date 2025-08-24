package com.shopster.bff;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

/**
 * Main application class for BFF Orchestration Service
 */
@SpringBootApplication
@EnableCaching
public class BffOrchestrationApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(BffOrchestrationApplication.class, args);
    }
}