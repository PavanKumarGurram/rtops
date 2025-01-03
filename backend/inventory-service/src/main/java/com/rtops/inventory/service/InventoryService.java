package com.rtops.inventory.service;

import com.rtops.inventory.model.Product;
import com.rtops.inventory.repository.ProductRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class InventoryService {
    private final ProductRepository productRepository;

    public InventoryService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Transactional
    @KafkaListener(topics = "inventory-updates")
    public void handleInventoryUpdate(InventoryEvent event) {
        Product product = productRepository.findById(event.getProductId())
            .orElseThrow(() -> new ProductNotFoundException(event.getProductId()));
        
        product.setStockQuantity(event.getNewQuantity());
        productRepository.save(product);
    }
}