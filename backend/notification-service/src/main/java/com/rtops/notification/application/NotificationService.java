package com.rtops.notification.application;

import com.rtops.shared.events.OrderEvent;
import com.rtops.shared.events.InventoryEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final EmailService emailService;
    private final WebSocketService webSocketService;

    @KafkaListener(topics = "order-events")
    public void handleOrderEvent(OrderEvent event) {
        // Notify customer about order status changes
        webSocketService.sendToUser(event.getCustomerId(), event);
        
        if ("ORDER_CREATED".equals(event.getEventType())) {
            emailService.sendOrderConfirmation(event.getOrderId());
        }
    }

    @KafkaListener(topics = "inventory-events")
    public void handleInventoryEvent(InventoryEvent event) {
        // Notify admin dashboard about inventory changes
        webSocketService.broadcastToAdmin(event);
        
        if (event.getQuantity() < 10) {
            emailService.sendLowStockAlert(event.getProductId(), event.getQuantity());
        }
    }
}