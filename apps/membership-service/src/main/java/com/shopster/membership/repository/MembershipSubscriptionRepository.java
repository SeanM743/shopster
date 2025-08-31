package com.shopster.membership.repository;

import com.shopster.membership.entity.MembershipSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Repository for Shopster+ membership subscriptions
 */
@Repository
public interface MembershipSubscriptionRepository extends JpaRepository<MembershipSubscription, Long> {

    Optional<MembershipSubscription> findByUserId(Long userId);

    List<MembershipSubscription> findByUserIdOrderByCreatedAtDesc(Long userId);

    @Query("SELECT s FROM MembershipSubscription s WHERE s.userId = :userId AND s.status IN ('ACTIVE', 'TRIALING')")
    Optional<MembershipSubscription> findActiveSubscriptionByUserId(@Param("userId") Long userId);

    List<MembershipSubscription> findByStatus(MembershipSubscription.SubscriptionStatus status);

    @Query("SELECT s FROM MembershipSubscription s WHERE s.nextBillingDate <= :date AND s.status = 'ACTIVE' AND s.autoRenew = true")
    List<MembershipSubscription> findSubscriptionsReadyForBilling(@Param("date") LocalDateTime date);

    @Query("SELECT s FROM MembershipSubscription s WHERE s.trialEndDate <= :date AND s.status = 'TRIALING'")
    List<MembershipSubscription> findExpiredTrials(@Param("date") LocalDateTime date);

    @Query("SELECT COUNT(s) FROM MembershipSubscription s WHERE s.status IN ('ACTIVE', 'TRIALING')")
    Long countActiveSubscriptions();

    @Query("SELECT COUNT(s) FROM MembershipSubscription s WHERE s.status = 'TRIALING'")
    Long countTrialSubscriptions();

    boolean existsByUserIdAndStatus(Long userId, MembershipSubscription.SubscriptionStatus status);

    @Query("SELECT s FROM MembershipSubscription s WHERE s.userId = :userId AND s.status IN ('ACTIVE', 'TRIALING', 'CANCELLED')")
    List<MembershipSubscription> findUserSubscriptionHistory(@Param("userId") Long userId);
}