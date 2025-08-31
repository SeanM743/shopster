package com.shopster.membership.config;

import com.shopster.membership.entity.MembershipPlan;
import com.shopster.membership.repository.MembershipPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;

/**
 * Seeds initial Shopster+ membership plans
 */
@Component
@Profile("dev")
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private MembershipPlanRepository planRepository;

    @Override
    public void run(String... args) throws Exception {
        if (planRepository.count() == 0) {
            seedMembershipPlans();
        }
    }

    private void seedMembershipPlans() {
        // 1-week free trial plan (for new users)
        MembershipPlan trialPlan = new MembershipPlan();
        trialPlan.setPlanCode("SHOPSTER_PLUS_TRIAL");
        trialPlan.setName("Shopster+ Free Trial");
        trialPlan.setDescription("Try Shopster+ for free for 7 days");
        trialPlan.setPrice(BigDecimal.ZERO);
        trialPlan.setBillingCycle(MembershipPlan.BillingCycle.WEEKLY);
        trialPlan.setTrialDays(7);
        trialPlan.setPlanType(MembershipPlan.PlanType.TRIAL);
        trialPlan.setDisplayOrder(0);
        trialPlan.setFeatures(Arrays.asList(
            "Free shipping on all orders",
            "Early access to sales",
            "Exclusive member-only deals",
            "Priority customer support"
        ));

        // Monthly plan with 1-week free trial
        MembershipPlan monthlyPlan = new MembershipPlan();
        monthlyPlan.setPlanCode("SHOPSTER_PLUS_MONTHLY");
        monthlyPlan.setName("Shopster+ Monthly");
        monthlyPlan.setDescription("Monthly Shopster+ membership with 1-week free trial");
        monthlyPlan.setPrice(new BigDecimal("9.99"));
        monthlyPlan.setBillingCycle(MembershipPlan.BillingCycle.MONTHLY);
        monthlyPlan.setTrialDays(7);
        monthlyPlan.setPlanType(MembershipPlan.PlanType.STANDARD);
        monthlyPlan.setDisplayOrder(1);
        monthlyPlan.setFeatures(Arrays.asList(
            "Free shipping on all orders",
            "Early access to sales",
            "Exclusive member-only deals",
            "Priority customer support",
            "Monthly surprise box",
            "Cancel anytime"
        ));

        // Annual plan with 1-week free trial
        MembershipPlan annualPlan = new MembershipPlan();
        annualPlan.setPlanCode("SHOPSTER_PLUS_ANNUAL");
        annualPlan.setName("Shopster+ Annual");
        annualPlan.setDescription("Annual Shopster+ membership with 1-week free trial - Best Value!");
        annualPlan.setPrice(new BigDecimal("99.00")); // $99/year vs $9.99 monthly
        annualPlan.setBillingCycle(MembershipPlan.BillingCycle.ANNUALLY);
        annualPlan.setTrialDays(7);
        annualPlan.setPlanType(MembershipPlan.PlanType.PREMIUM);
        annualPlan.setDisplayOrder(2);
        annualPlan.setFeatures(Arrays.asList(
            "Free shipping on all orders",
            "Early access to sales",
            "Exclusive member-only deals",
            "Priority customer support",
            "Monthly surprise box",
            "Best value - save over monthly",
            "Annual member-exclusive events",
            "Extended return policy"
        ));

        planRepository.save(trialPlan);
        planRepository.save(monthlyPlan);
        planRepository.save(annualPlan);

        System.out.println("Successfully seeded Shopster+ membership plans:");
        System.out.println("- Free Trial: $0.00/week (7 days)");
        System.out.println("- Monthly: $9.99/month (with 7-day trial)");
        System.out.println("- Annual: $99.00/year (with 7-day trial)");
    }
}