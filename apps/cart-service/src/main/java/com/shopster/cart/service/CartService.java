package com.shopster.cart.service;

import com.shopster.cart.domain.Cart;
import com.shopster.cart.domain.CartItem;
import com.shopster.cart.dto.AddItemRequest;
import com.shopster.cart.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class CartService {

    private final CartRepository cartRepository;

    @Autowired
    public CartService(CartRepository cartRepository) {
        this.cartRepository = cartRepository;
    }

    public Cart getCart(String userId) {
        return cartRepository.findById(userId).orElse(new Cart(userId));
    }

    public Cart addItemToCart(String userId, AddItemRequest addItemRequest) {
        Cart cart = getCart(userId);
        Optional<CartItem> existingItem = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(addItemRequest.getProductId()))
                .findFirst();

        if (existingItem.isPresent()) {
            existingItem.get().setQuantity(existingItem.get().getQuantity() + addItemRequest.getQuantity());
        } else {
            CartItem newItem = new CartItem(
                    addItemRequest.getProductId(),
                    addItemRequest.getProductName(),
                    addItemRequest.getQuantity(),
                    BigDecimal.valueOf(addItemRequest.getPrice())
            );
            cart.getItems().add(newItem);
        }

        return cartRepository.save(cart);
    }

    public Cart updateItemInCart(String userId, String productId, int quantity) {
        Cart cart = getCart(userId);
        cart.getItems().stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst()
                .ifPresent(item -> item.setQuantity(quantity));

        return cartRepository.save(cart);
    }

    public Cart removeItemFromCart(String userId, String productId) {
        Cart cart = getCart(userId);
        cart.getItems().removeIf(item -> item.getProductId().equals(productId));
        return cartRepository.save(cart);
    }

    public void clearCart(String userId) {
        cartRepository.deleteById(userId);
    }
}
