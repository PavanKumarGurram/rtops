package com.rtops.order.application;

import com.rtops.order.domain.Order;
import com.rtops.order.domain.OrderRepository;
import com.rtops.shared.events.OrderEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;

    @Transactional
    public Order createOrder(Order order) {
        Order savedOrder = orderRepository.save(order);
        publishOrderEvent(savedOrder, "ORDER_CREATED");
        return savedOrder;
    }

    @Transactional
    public Order updateOrderStatus(String orderId, String status) {
        Order order = orderRepository.findById(orderId)
            .orElseThrow(() -> new OrderNotFoundException(orderId));
        
        order.setStatus(OrderStatus.valueOf(status));
        Order updatedOrder = orderRepository.save(order);
        publishOrderEvent(updatedOrder, "ORDER_UPDATED");
        
        return updatedOrder;
    }

    private void publishOrderEvent(Order order, String eventType) {
        OrderEvent event = new OrderEvent();
        event.setEventType(eventType);
        event.setOrderId(order.getId());
        event.setStatus(order.getStatus().name());
        event.setTimestamp(LocalDateTime.now());
        
        kafkaTemplate.send("order-events", event);
    }
}