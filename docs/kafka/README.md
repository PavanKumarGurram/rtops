# RTOPS Kafka Setup

Apache Kafka configuration for event streaming.

## Topics

1. **order-events**
   - Partitions: 3
   - Replication: 3
   - Retention: 7 days
   - Events: ORDER_CREATED, ORDER_UPDATED, ORDER_CANCELLED

2. **inventory-updates**
   - Partitions: 3
   - Replication: 3
   - Cleanup: Compact
   - Events: STOCK_UPDATED, LOW_STOCK_ALERT

3. **notifications**
   - Partitions: 3
   - Replication: 3
   - Retention: 1 day
   - Events: EMAIL_NOTIFICATION, SMS_NOTIFICATION

## Setup

1. Start Kafka:
```bash
docker-compose up -d kafka zookeeper
```

2. Create topics:
```bash
./kafka/topics/create-topics.sh
```

## Monitoring

- Kafka metrics in Grafana
- Kafka Manager UI: http://localhost:9000

## Event Schemas

```json
// Order Event
{
  "eventType": "ORDER_CREATED",
  "orderId": "uuid",
  "timestamp": "ISO-8601",
  "data": {
    "customerId": "uuid",
    "items": [
      {
        "productId": "uuid",
        "quantity": 1
      }
    ]
  }
}
```

## Consumer Groups

- order-service-group
- inventory-service-group
- notification-service-group

## Best Practices

1. Use exactly-once semantics
2. Implement dead letter queues
3. Monitor consumer lag
4. Set up alerts for partition errors