package com.rtops.inventory.application;

import com.rtops.inventory.domain.Product;
import com.rtops.inventory.domain.ProductRepository;
import com.rtops.shared.events.InventoryEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class InventoryService {
    private final ProductRepository productRepository;
    private final KafkaTemplate<String, InventoryEvent> kafkaTemplate;

    @Transactional
    @KafkaListener(topics = "order-events")
    public void handleOrderEvent(OrderEvent event) {
        if ("ORDER_CREATED".equals(event.getEventType())) {
            // Handle inventory reduction
            updateProductStock(event.getProductId(), -event.getQuantity());
        }
    }

    @Transactional
    public void updateProductStock(String productId, int quantityChange) {
        Product product = productRepository.findById(productId)
            .orElseThrow(() -> new ProductNotFoundException(productId));
        
        product.setStockQuantity(product.getStockQuantity() + quantityChange);
        productRepository.save(product);
        
        publishInventoryEvent(product);
    }

    private void publishInventoryEvent(Product product) {
        InventoryEvent event = new InventoryEvent();
        event.setEventType("INVENTORY_UPDATED");
        event.setProductId(product.getId());
        event.setQuantity(product.getStockQuantity());
        event.setTimestamp(LocalDateTime.now());
        
        kafkaTemplate.send("inventory-events", event);
    }
}