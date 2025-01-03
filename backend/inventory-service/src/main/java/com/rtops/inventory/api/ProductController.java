package com.rtops.inventory.api;

import com.rtops.inventory.application.InventoryService;
import com.rtops.inventory.domain.Product;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {
    private final InventoryService inventoryService;

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(inventoryService.getAllProducts());
    }

    @GetMapping("/{productId}")
    public ResponseEntity<Product> getProduct(@PathVariable String productId) {
        return ResponseEntity.ok(inventoryService.getProduct(productId));
    }

    @PutMapping("/{productId}/stock")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Product> updateStock(@PathVariable String productId,
                                             @RequestBody StockUpdateRequest request) {
        Product product = inventoryService.updateProductStock(productId, request.getQuantityChange());
        return ResponseEntity.ok(product);
    }
}