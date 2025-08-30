# Shopster Startup Instructions

This file contains the instructions to start all the services for the Shopster ecommerce website.

## 1. Start the Databases

Open a terminal and run the following command to start the databases (PostgreSQL, MongoDB, and Redis) in the background:

```bash
docker compose up -d postgres mongodb redis
```

## 2. Start the Backend Microservices

For each of the following services, open a new terminal window and run the corresponding command.

*   **Product Service (port 8082):**
    ```bash
    cd apps/product-service && mvn spring-boot:run -Dspring.profiles.active=dev
    ```

*   **User Service (port 8083):**
    ```bash
    cd apps/user-service && mvn spring-boot:run -Dspring.profiles.active=dev
    ```

*   **Cart Service (port 8085):**
    ```bash
    cd apps/cart-service && mvn spring-boot:run -Dspring.profiles.active=dev
    ```

*   **Membership Service (port 8084):**
    ```bash
    cd apps/membership-service && mvn spring-boot:run -Dspring.profiles.active=dev
    ```

*   **API Gateway (port 8081):**
    ```bash
    cd apps/api-gateway && mvn spring-boot:run -Dspring.profiles.active=dev
    ```

## 3. Start the Frontend

Open a new terminal window and run the following commands:

*   **Frontend (port 3000):**
    ```bash
    cd apps/frontend && npm start
    ```
