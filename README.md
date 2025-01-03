# Real-Time Order Processing System (RTOPS)

A scalable, event-driven system for real-time order processing and inventory management.

## System Architecture

![Architecture Diagram](docs/images/architecture.png)

### Components
- **Frontend**: Angular SPA with Material UI
- **Backend**: Spring Boot microservices
- **Message Broker**: Apache Kafka for event streaming
- **Database**: Oracle for persistent storage
- **DevOps**: Docker + Kubernetes deployment

## Prerequisites

- Docker and Docker Compose v2.0+
- Kubernetes cluster (v1.25+)
- Java 17
- Node.js 18+
- Maven 3.8+
- Oracle Database 19c+

## Quick Start

1. Clone the repository:
```bash
git clone https://github.com/PavanKumarGurram/rtops.git
cd rtops
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start infrastructure services:
```bash
docker-compose up -d kafka oracle
```

4. Deploy the application:
```bash
skaffold run
```

5. Access the application:
- Frontend: http://localhost
- Backend API: http://localhost:8080
- Grafana: http://localhost:3000

## Development

See individual component READMEs for detailed development instructions:
- [Frontend Documentation](./frontend/README.md)
- [Backend Documentation](./backend/README.md)
- [Database Documentation](./docs/database/README.md)
- [Kafka Documentation](./docs/kafka/README.md)
- [DevOps Documentation](./docs/devops/README.md)

## Testing

Each component includes its own test suite:

```bash
# Frontend tests
cd frontend && npm test

# Backend tests
cd backend && mvn test

# Integration tests
./scripts/run-integration-tests.sh
```

## Monitoring

- Prometheus metrics: http://localhost:9090
- Grafana dashboards: http://localhost:3000
- Kafka Manager: http://localhost:9000

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT