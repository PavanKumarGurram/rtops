package com.rtops.order.service;

import com.rtops.order.model.Order;
import com.rtops.order.repository.OrderRepository;
import com.rtops.order.event.OrderEvent;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;

    public OrderService(
        OrderRepository orderRepository,
        KafkaTemplate<String, OrderEvent> kafkaTemplate
    ) {
        this.orderRepository = orderRepository;
        this.kafkaTemplate = kafkaTemplate;
    }

    @Transactional
    public Order createOrder(Order order) {
        Order savedOrder = orderRepository.save(order);
        kafkaTemplate.send("order-events", new OrderEvent(savedOrder));
        return savedOrder;
    }

    public Order getOrder(String id) {
        return orderRepository.findById(id)
            .orElseThrow(() -> new OrderNotFoundException(id));
    }
}