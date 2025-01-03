-- Create audit log table
CREATE TABLE audit_log (
    id VARCHAR2(36) PRIMARY KEY,
    table_name VARCHAR2(100) NOT NULL,
    record_id VARCHAR2(36) NOT NULL,
    action VARCHAR2(10) NOT NULL,
    old_values CLOB,
    new_values CLOB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger for product updates
CREATE OR REPLACE TRIGGER trg_product_audit
AFTER UPDATE ON products
FOR EACH ROW
BEGIN
    INSERT INTO audit_log (
        id,
        table_name,
        record_id,
        action,
        old_values,
        new_values
    ) VALUES (
        SYS_GUID(),
        'products',
        :OLD.id,
        'UPDATE',
        JSON_OBJECT(
            'stock_quantity' VALUE :OLD.stock_quantity,
            'price' VALUE :OLD.price
        ),
        JSON_OBJECT(
            'stock_quantity' VALUE :NEW.stock_quantity,
            'price' VALUE :NEW.price
        )
    );
END;