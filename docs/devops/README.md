# RTOPS DevOps Guide

Deployment and operations documentation.

## Local Development

1. Start with Skaffold:
```bash
skaffold dev
```

## Production Deployment

1. Build images:
```bash
docker build -f Dockerfile.frontend -t rtops/frontend .
docker build -f Dockerfile.backend -t rtops/backend .
```

2. Deploy to Kubernetes:
```bash
kubectl apply -f k8s/base/

# Create secrets
kubectl create secret generic db-credentials \
  --from-literal=username=rtops \
  --from-literal=password=your_password
```

## Infrastructure

### Kubernetes Resources
- Deployments
- Services
- ConfigMaps
- Secrets
- HPA
- PVCs

### Monitoring Stack
- Prometheus
- Grafana
- Alert Manager

## Scaling

Automatic scaling based on metrics:
- Frontend: 2-5 replicas
- Backend: 3-10 replicas
- Kafka: 3-5 brokers

## Security

1. Network Policies
2. RBAC Configuration
3. Secret Management
4. TLS Configuration

## Backup & Recovery

1. Database Backups
2. Kafka Topic Backups
3. Configuration Backups

## Troubleshooting Guide

Common issues and solutions in [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)