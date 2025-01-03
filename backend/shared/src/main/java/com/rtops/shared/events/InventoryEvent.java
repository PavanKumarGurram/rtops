package com.rtops.shared.events;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class InventoryEvent implements Event {
    private String eventType;
    private String productId;
    private Integer quantity;
    private LocalDateTime timestamp;

    @Override
    public String getEventType() {
        return eventType;
    }

    @Override
    public String getAggregateId() {
        return productId;
    }
}