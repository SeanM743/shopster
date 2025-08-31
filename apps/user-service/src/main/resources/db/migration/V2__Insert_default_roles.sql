-- Insert default roles
INSERT INTO roles (name, description) VALUES
    ('ADMIN', 'System administrator with full access'),
    ('CUSTOMER', 'Regular customer with standard access'),
    ('SUPPORT', 'Customer support representative'),
    ('MODERATOR', 'Content moderator with limited admin access');

-- Insert default permissions for each role
INSERT INTO permissions (name, role_id, resource, action) VALUES
    -- Admin permissions
    ('ADMIN_USER_CREATE', (SELECT id FROM roles WHERE name = 'ADMIN'), 'USER', 'CREATE'),
    ('ADMIN_USER_READ', (SELECT id FROM roles WHERE name = 'ADMIN'), 'USER', 'READ'),
    ('ADMIN_USER_UPDATE', (SELECT id FROM roles WHERE name = 'ADMIN'), 'USER', 'UPDATE'),
    ('ADMIN_USER_DELETE', (SELECT id FROM roles WHERE name = 'ADMIN'), 'USER', 'DELETE'),
    ('ADMIN_ROLE_CREATE', (SELECT id FROM roles WHERE name = 'ADMIN'), 'ROLE', 'CREATE'),
    ('ADMIN_ROLE_READ', (SELECT id FROM roles WHERE name = 'ADMIN'), 'ROLE', 'READ'),
    ('ADMIN_ROLE_UPDATE', (SELECT id FROM roles WHERE name = 'ADMIN'), 'ROLE', 'UPDATE'),
    ('ADMIN_ROLE_DELETE', (SELECT id FROM roles WHERE name = 'ADMIN'), 'ROLE', 'DELETE'),
    
    -- Customer permissions
    ('CUSTOMER_USER_READ', (SELECT id FROM roles WHERE name = 'CUSTOMER'), 'USER', 'READ'),
    ('CUSTOMER_USER_UPDATE', (SELECT id FROM roles WHERE name = 'CUSTOMER'), 'USER', 'UPDATE'),
    ('CUSTOMER_ADDRESS_CREATE', (SELECT id FROM roles WHERE name = 'CUSTOMER'), 'ADDRESS', 'CREATE'),
    ('CUSTOMER_ADDRESS_READ', (SELECT id FROM roles WHERE name = 'CUSTOMER'), 'ADDRESS', 'READ'),
    ('CUSTOMER_ADDRESS_UPDATE', (SELECT id FROM roles WHERE name = 'CUSTOMER'), 'ADDRESS', 'UPDATE'),
    ('CUSTOMER_ADDRESS_DELETE', (SELECT id FROM roles WHERE name = 'CUSTOMER'), 'ADDRESS', 'DELETE'),
    
    -- Support permissions
    ('SUPPORT_USER_READ', (SELECT id FROM roles WHERE name = 'SUPPORT'), 'USER', 'READ'),
    ('SUPPORT_USER_UPDATE', (SELECT id FROM roles WHERE name = 'SUPPORT'), 'USER', 'UPDATE'),
    
    -- Moderator permissions
    ('MODERATOR_USER_READ', (SELECT id FROM roles WHERE name = 'MODERATOR'), 'USER', 'READ'),
    ('MODERATOR_USER_UPDATE', (SELECT id FROM roles WHERE name = 'MODERATOR'), 'USER', 'UPDATE');