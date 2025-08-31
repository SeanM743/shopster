package com.shopster.membership;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * Main application class for Shopster+ Membership Service
 */
@SpringBootApplication
@EnableJpaAuditing
@EnableScheduling
public class MembershipServiceApplication {
    
    public static void main(String[] args) {
        SpringApplication.run(MembershipServiceApplication.class, args);
    }
}