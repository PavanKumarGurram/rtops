# RTOPS Database

Oracle database configuration and schema management.

## Schema Setup

1. Create database user:
```sql
CREATE USER rtops IDENTIFIED BY your_password;
GRANT CONNECT, RESOURCE TO rtops;
```

2. Run migrations:
```bash
cd oracledb/migrations
# Run each SQL file in numerical order
```

## Tables

- customers
- products
- orders
- order_items
- audit_log

## Backup & Restore

```bash
# Backup
exp rtops/password@RTOPS file=rtops.dmp

# Restore
imp rtops/password@RTOPS file=rtops.dmp
```