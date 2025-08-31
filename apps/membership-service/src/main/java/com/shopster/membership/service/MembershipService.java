package com.shopster.membership.service;

import com.shopster.membership.dto.CreateSubscriptionRequest;
import com.shopster.membership.dto.MembershipPlanDto;
import com.shopster.membership.entity.MembershipPlan;
import com.shopster.membership.entity.MembershipSubscription;
import com.shopster.membership.repository.MembershipPlanRepository;
import com.shopster.membership.repository.MembershipSubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service for managing Shopster+ memberships
 */
@Service
@Transactional
public class MembershipService {

    @Autowired
    private MembershipPlanRepository planRepository;

    @Autowired
    private MembershipSubscriptionRepository subscriptionRepository;

    @Autowired
    private PaymentStubService paymentService;

    /**
     * Get all active membership plans
     */
    @Transactional(readOnly = true)
    public List<MembershipPlanDto> getActiveShopsterPlusPlans() {
        List<MembershipPlan> plans = planRepository.findActivePaidPlans();
        return plans.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    /**
     * Get membership plan by code
     */
    @Transactional(readOnly = true)
    public Optional<MembershipPlanDto> getPlanByCode(String planCode) {
        return planRepository.findByPlanCode(planCode)
                .map(this::convertToDto);
    }

    /**
     * Create a new Shopster+ subscription
     */
    public MembershipSubscription createSubscription(CreateSubscriptionRequest request) {
        // Find the plan
        MembershipPlan plan = planRepository.findByPlanCode(request.getPlanCode())
                .orElseThrow(() -> new RuntimeException("Plan not found: " + request.getPlanCode()));

        // Check if user already has an active subscription
        Optional<MembershipSubscription> existingSubscription = 
            subscriptionRepository.findActiveSubscriptionByUserId(request.getUserId());
        
        if (existingSubscription.isPresent()) {
            throw new RuntimeException("User already has an active subscription");
        }

        // Validate payment method
        if (!paymentService.validatePaymentMethod(request.getPaymentMethodId(), request.getPaymentMethodType())) {
            throw new RuntimeException("Invalid payment method");
        }

        // Create subscription
        MembershipSubscription subscription = new MembershipSubscription();
        subscription.setUserId(request.getUserId());
        subscription.setPlan(plan);
        subscription.setAmount(plan.getPrice());
        subscription.setPaymentMethodId(request.getPaymentMethodId());
        subscription.setPaymentMethodType(request.getPaymentMethodType());
        subscription.setAutoRenew(request.getAutoRenew());

        // Set up trial or immediate billing
        LocalDateTime now = LocalDateTime.now();
        
        if (plan.hasFreeTrial()) {
            // Start free trial
            subscription.setStatus(MembershipSubscription.SubscriptionStatus.TRIALING);
            subscription.setTrialStartDate(now);
            subscription.setTrialEndDate(now.plusDays(plan.getTrialDays()));
            
            // First billing date is after trial ends
            subscription.setNextBillingDate(subscription.getTrialEndDate());
        } else {
            // Process immediate payment
            PaymentStubService.PaymentResult paymentResult = paymentService.processPayment(
                request.getPaymentMethodId(),
                request.getPaymentMethodType(),
                plan.getPrice(),
                "Shopster+ " + plan.getName() + " subscription"
            );

            if (!paymentResult.isSuccess()) {
                throw new RuntimeException("Payment failed: " + paymentResult.getErrorMessage());
            }

            // Activate subscription immediately
            subscription.setStatus(MembershipSubscription.SubscriptionStatus.ACTIVE);
            subscription.setSubscriptionStartDate(now);
            subscription.setLastBillingDate(now);
            
            // Set next billing date based on plan cycle
            subscription.setNextBillingDate(calculateNextBillingDate(now, plan.getBillingCycle()));
        }

        return subscriptionRepository.save(subscription);
    }

    /**
     * Get user's active subscription
     */
    @Transactional(readOnly = true)
    public Optional<MembershipSubscription> getUserActiveSubscription(Long userId) {
        return subscriptionRepository.findActiveSubscriptionByUserId(userId);
    }

    /**
     * Get user's subscription history
     */
    @Transactional(readOnly = true)
    public List<MembershipSubscription> getUserSubscriptionHistory(Long userId) {
        return subscriptionRepository.findUserSubscriptionHistory(userId);
    }

    /**
     * Cancel a subscription
     */
    public void cancelSubscription(Long subscriptionId, String reason) {
        MembershipSubscription subscription = subscriptionRepository.findById(subscriptionId)
                .orElseThrow(() -> new RuntimeException("Subscription not found"));

        subscription.setStatus(MembershipSubscription.SubscriptionStatus.CANCELLED);
        subscription.setCancellationDate(LocalDateTime.now());
        subscription.setCancellationReason(reason);
        subscription.setAutoRenew(false);

        // Cancel recurring payment
        paymentService.cancelRecurringPayment(subscription.getPaymentMethodId());

        subscriptionRepository.save(subscription);
    }

    /**
     * Check if user has active Shopster+ membership
     */
    @Transactional(readOnly = true)
    public boolean isShopsterPlusMember(Long userId) {
        return subscriptionRepository.findActiveSubscriptionByUserId(userId).isPresent();
    }

    /**
     * Convert entity to DTO
     */
    private MembershipPlanDto convertToDto(MembershipPlan plan) {
        MembershipPlanDto dto = new MembershipPlanDto();
        dto.setId(plan.getId());
        dto.setPlanCode(plan.getPlanCode());
        dto.setName(plan.getName());
        dto.setDescription(plan.getDescription());
        dto.setPrice(plan.getPrice());
        dto.setBillingCycle(plan.getBillingCycle());
        dto.setTrialDays(plan.getTrialDays());
        dto.setActive(plan.getActive());
        dto.setPlanType(plan.getPlanType());
        dto.setDisplayOrder(plan.getDisplayOrder());
        dto.setFeatures(plan.getFeatures());

        // Set formatted fields for frontend display
        dto.setFormattedPrice(String.format("$%.2f", plan.getPrice()));
        dto.setBillingCycleDisplay(plan.getBillingCycle().getDisplayName());
        
        if (plan.hasFreeTrial()) {
            dto.setTrialDescription(plan.getTrialDays() + "-day free trial");
        }

        return dto;
    }

    /**
     * Calculate next billing date based on billing cycle
     */
    private LocalDateTime calculateNextBillingDate(LocalDateTime from, MembershipPlan.BillingCycle cycle) {
        return switch (cycle) {
            case WEEKLY -> from.plusWeeks(1);
            case MONTHLY -> from.plusMonths(1);
            case ANNUALLY -> from.plusYears(1);
        };
    }
}