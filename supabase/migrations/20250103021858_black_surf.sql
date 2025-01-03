-- Create customers table
CREATE TABLE customers (
    id VARCHAR2(36) PRIMARY KEY,
    email VARCHAR2(255) UNIQUE NOT NULL,
    password_hash VARCHAR2(255) NOT NULL,
    first_name VARCHAR2(100),
    last_name VARCHAR2(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE products (
    id VARCHAR2(36) PRIMARY KEY,
    name VARCHAR2(255) NOT NULL,
    description CLOB,
    price NUMBER(10,2) NOT NULL,
    stock_quantity NUMBER NOT NULL,
    category VARCHAR2(100),
    image_url VARCHAR2(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE orders (
    id VARCHAR2(36) PRIMARY KEY,
    customer_id VARCHAR2(36) REFERENCES customers(id),
    status VARCHAR2(20) NOT NULL,
    total_amount NUMBER(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create order items table
CREATE TABLE order_items (
    id VARCHAR2(36) PRIMARY KEY,
    order_id VARCHAR2(36) REFERENCES orders(id),
    product_id VARCHAR2(36) REFERENCES products(id),
    quantity NUMBER NOT NULL,
    price NUMBER(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE INDEX idx_order_items_order ON order_items(order_id);
CREATE INDEX idx_products_category ON products(category);