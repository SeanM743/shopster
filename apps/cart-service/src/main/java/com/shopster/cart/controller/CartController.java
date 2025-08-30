package com.shopster.cart.controller;

import com.shopster.cart.domain.Cart;
import com.shopster.cart.dto.AddItemRequest;
import com.shopster.cart.dto.UpdateItemRequest;
import com.shopster.cart.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/cart")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{userId}")
    public Cart getCart(@PathVariable String userId) {
        return cartService.getCart(userId);
    }

    @PostMapping("/{userId}/items")
    public Cart addItemToCart(@PathVariable String userId, @Valid @RequestBody AddItemRequest addItemRequest) {
        return cartService.addItemToCart(userId, addItemRequest);
    }

    @PutMapping("/{userId}/items/{productId}")
    public Cart updateItemInCart(@PathVariable String userId, @PathVariable String productId, @Valid @RequestBody UpdateItemRequest updateItemRequest) {
        return cartService.updateItemInCart(userId, productId, updateItemRequest.getQuantity());
    }

    @DeleteMapping("/{userId}/items/{productId}")
    public Cart removeItemFromCart(@PathVariable String userId, @PathVariable String productId) {
        return cartService.removeItemFromCart(userId, productId);
    }

    @DeleteMapping("/{userId}")
    public void clearCart(@PathVariable String userId) {
        cartService.clearCart(userId);
    }
}