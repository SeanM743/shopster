FROM openjdk:17-jdk-slim

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN apt-get update && apt-get install -y maven
RUN mvn clean package -DskipTests

EXPOSE 8085

ENTRYPOINT ["java", "-jar", "target/cart-service-1.0.0-SNAPSHOT.jar"]
