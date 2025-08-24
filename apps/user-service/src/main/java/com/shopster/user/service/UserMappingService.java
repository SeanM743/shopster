package com.shopster.user.service;

import com.shopster.user.dto.AddressDto;
import com.shopster.user.dto.RoleDto;
import com.shopster.user.dto.UserDto;
import com.shopster.user.entity.Address;
import com.shopster.user.entity.Role;
import com.shopster.user.entity.User;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

/**
 * Service for mapping between entities and DTOs
 */
@Service
public class UserMappingService {
    
    /**
     * Convert User entity to UserDto
     */
    public UserDto toUserDto(User user) {
        if (user == null) {
            return null;
        }
        
        UserDto dto = new UserDto();
        dto.setId(user.getId());
        dto.setEmail(user.getEmail());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setDateOfBirth(user.getDateOfBirth());
        dto.setEmailVerified(user.getEmailVerified());
        dto.setAccountStatus(user.getAccountStatus().name());
        dto.setPreferredLanguage(user.getPreferredLanguage());
        dto.setMarketingConsent(user.getMarketingConsent());
        dto.setCreatedAt(user.getCreatedAt());
        dto.setUpdatedAt(user.getUpdatedAt());
        
        // Map roles
        if (user.getRoles() != null) {
            dto.setRoles(user.getRoles().stream()
                    .map(this::toRoleDto)
                    .collect(Collectors.toSet()));
        }
        
        // Map addresses
        if (user.getAddresses() != null) {
            dto.setAddresses(user.getAddresses().stream()
                    .map(this::toAddressDto)
                    .collect(Collectors.toSet()));
        }
        
        return dto;
    }
    
    /**
     * Convert Role entity to RoleDto
     */
    public RoleDto toRoleDto(Role role) {
        if (role == null) {
            return null;
        }
        
        RoleDto dto = new RoleDto();
        dto.setId(role.getId());
        dto.setName(role.getName());
        dto.setDescription(role.getDescription());
        
        return dto;
    }
    
    /**
     * Convert Address entity to AddressDto
     */
    public AddressDto toAddressDto(Address address) {
        if (address == null) {
            return null;
        }
        
        AddressDto dto = new AddressDto();
        dto.setId(address.getId());
        dto.setStreetAddress(address.getStreetAddress());
        dto.setApartment(address.getApartment());
        dto.setCity(address.getCity());
        dto.setState(address.getState());
        dto.setPostalCode(address.getPostalCode());
        dto.setCountry(address.getCountry());
        dto.setAddressType(address.getAddressType().name());
        dto.setIsDefault(address.getIsDefault());
        
        return dto;
    }
    
    /**
     * Convert UserDto to User entity (for updates)
     */
    public User toUserEntity(UserDto dto) {
        if (dto == null) {
            return null;
        }
        
        User user = new User();
        user.setId(dto.getId());
        user.setEmail(dto.getEmail());
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setDateOfBirth(dto.getDateOfBirth());
        user.setEmailVerified(dto.getEmailVerified());
        user.setPreferredLanguage(dto.getPreferredLanguage());
        user.setMarketingConsent(dto.getMarketingConsent());
        
        if (dto.getAccountStatus() != null) {
            user.setAccountStatus(User.AccountStatus.valueOf(dto.getAccountStatus()));
        }
        
        return user;
    }
    
    /**
     * Convert AddressDto to Address entity
     */
    public Address toAddressEntity(AddressDto dto) {
        if (dto == null) {
            return null;
        }
        
        Address address = new Address();
        address.setId(dto.getId());
        address.setStreetAddress(dto.getStreetAddress());
        address.setApartment(dto.getApartment());
        address.setCity(dto.getCity());
        address.setState(dto.getState());
        address.setPostalCode(dto.getPostalCode());
        address.setCountry(dto.getCountry());
        address.setIsDefault(dto.getIsDefault());
        
        if (dto.getAddressType() != null) {
            address.setAddressType(Address.AddressType.valueOf(dto.getAddressType()));
        }
        
        return address;
    }
}