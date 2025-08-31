package com.shopster.membership.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Component
public class DatabaseConnectionProvider {

    private static final Logger logger = LoggerFactory.getLogger(DatabaseConnectionProvider.class);

    @Value("${spring.datasource.url}")
    private String dbUrl;

    @Value("${spring.datasource.username}")
    private String dbUsername;

    @Value("${spring.datasource.password}")
    private String dbPassword;

    public Connection getConnectionWithRetry(int maxRetries, long retryDelayMillis) throws SQLException, InterruptedException {
        for (int i = 0; i < maxRetries; i++) {
            try {
                logger.info("Attempting to connect to database (attempt {}/{})", i + 1, maxRetries);
                return DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
            } catch (SQLException e) {
                logger.warn("Failed to connect to database: {}. Retrying in {} ms...", e.getMessage(), retryDelayMillis);
                Thread.sleep(retryDelayMillis);
            }
        }
        throw new SQLException("Failed to connect to database after " + maxRetries + " retries.");
    }
}
