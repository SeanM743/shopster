package com.shopster.membership.repository;

import com.shopster.membership.entity.MembershipPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for Shopster+ membership plans
 */
@Repository
public interface MembershipPlanRepository extends JpaRepository<MembershipPlan, Long> {

    Optional<MembershipPlan> findByPlanCode(String planCode);

    List<MembershipPlan> findByActiveOrderByDisplayOrderAsc(Boolean active);

    @Query("SELECT p FROM MembershipPlan p WHERE p.active = true AND p.planType != 'TRIAL' ORDER BY p.displayOrder ASC")
    List<MembershipPlan> findActivePaidPlans();

    @Query("SELECT p FROM MembershipPlan p WHERE p.active = true AND p.planType = 'TRIAL' ORDER BY p.displayOrder ASC")
    List<MembershipPlan> findActiveTrialPlans();

    List<MembershipPlan> findByPlanTypeAndActiveOrderByDisplayOrderAsc(MembershipPlan.PlanType planType, Boolean active);

    List<MembershipPlan> findByBillingCycleAndActiveOrderByDisplayOrderAsc(MembershipPlan.BillingCycle billingCycle, Boolean active);

    boolean existsByPlanCode(String planCode);
}