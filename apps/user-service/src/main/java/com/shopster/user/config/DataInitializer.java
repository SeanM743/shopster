package com.shopster.user.config;

import com.shopster.user.entity.Role;
import com.shopster.user.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    @Autowired
    public DataInitializer(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (roleRepository.findByName(Role.CUSTOMER).isEmpty()) {
            roleRepository.save(new Role(Role.CUSTOMER, "Default role for customers"));
        }
        if (roleRepository.findByName(Role.ADMIN).isEmpty()) {
            roleRepository.save(new Role(Role.ADMIN, "Administrator role with full access"));
        }
    }
}
