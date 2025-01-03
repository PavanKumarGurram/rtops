#!/bin/bash

# Create order events topic
kafka-topics.sh --create \
  --bootstrap-server localhost:9092 \
  --topic order-events \
  --partitions 3 \
  --replication-factor 3 \
  --config cleanup.policy=delete \
  --config retention.ms=604800000

# Create inventory updates topic
kafka-topics.sh --create \
  --bootstrap-server localhost:9092 \
  --topic inventory-updates \
  --partitions 3 \
  --replication-factor 3 \
  --config cleanup.policy=compact

# Create notifications topic
kafka-topics.sh --create \
  --bootstrap-server localhost:9092 \
  --topic notifications \
  --partitions 3 \
  --replication-factor 3 \
  --config cleanup.policy=delete \
  --config retention.ms=86400000