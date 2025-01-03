package com.rtops.shared.events;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class OrderEvent implements Event {
    private String eventType;
    private String orderId;
    private String status;
    private LocalDateTime timestamp;

    @Override
    public String getEventType() {
        return eventType;
    }

    @Override
    public String getAggregateId() {
        return orderId;
    }
}