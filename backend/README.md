# RTOPS Backend

Spring Boot microservices for order processing and inventory management.

## Microservices

- **Order Service** (8081)
  - Order processing
  - Payment integration
  - Order status management

- **Inventory Service** (8082)
  - Stock management
  - Product catalog
  - Real-time inventory updates

- **Notification Service** (8083)
  - Email notifications
  - WebSocket updates
  - SMS integration

## Prerequisites

- Java 17
- Maven 3.8+
- Oracle Database 19c+
- Apache Kafka 3.0+

## Setup

1. Configure database:
```bash
cp src/main/resources/application.example.yml src/main/resources/application.yml
# Edit application.yml with your database credentials
```

2. Build all services:
```bash
mvn clean package
```

3. Run services:
```bash
# Start each service
java -jar target/order-service.jar
java -jar target/inventory-service.jar
java -jar target/notification-service.jar
```

## API Documentation

- Swagger UI: `/swagger-ui.html`
- OpenAPI spec: `/v3/api-docs`

## Project Structure

```
src/
├── main/
│   ├── java/
│   │   └── com/rtops/
│   │       ├── api/        # REST controllers
│   │       ├── domain/     # Domain models
│   │       ├── service/    # Business logic
│   │       └── config/     # Configurations
│   └── resources/          # Application properties
└── test/                   # Test cases
```

## Testing

```bash
# Run all tests
mvn test

# Run specific service tests
mvn test -pl order-service
```

## Monitoring

- Actuator endpoints: `/actuator`
- Prometheus metrics: `/actuator/prometheus`
- Health check: `/actuator/health`