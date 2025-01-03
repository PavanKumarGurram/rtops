package com.rtops.order.api;

import com.rtops.order.application.OrderService;
import com.rtops.order.domain.Order;
import com.rtops.shared.security.CurrentUser;
import com.rtops.shared.security.UserPrincipal;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Order> createOrder(@CurrentUser UserPrincipal currentUser,
                                           @RequestBody OrderRequest request) {
        Order order = orderService.createOrder(request.toOrder(currentUser.getId()));
        return ResponseEntity.ok(order);
    }

    @GetMapping("/{orderId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<Order> getOrder(@CurrentUser UserPrincipal currentUser,
                                        @PathVariable String orderId) {
        Order order = orderService.getOrder(orderId);
        validateOrderAccess(currentUser, order);
        return ResponseEntity.ok(order);
    }

    @PutMapping("/{orderId}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Order> updateOrderStatus(@PathVariable String orderId,
                                                 @RequestBody OrderStatusRequest request) {
        Order order = orderService.updateOrderStatus(orderId, request.getStatus());
        return ResponseEntity.ok(order);
    }

    private void validateOrderAccess(UserPrincipal user, Order order) {
        if (!user.hasRole("ADMIN") && !order.getCustomerId().equals(user.getId())) {
            throw new ForbiddenException("You don't have permission to access this order");
        }
    }
}