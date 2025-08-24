-- Insert default roles
INSERT INTO roles (name, description) VALUES
    ('ADMIN', 'System administrator with full access'),
    ('CUSTOMER', 'Regular customer with standard access'),
    ('SUPPORT', 'Customer support representative'),
    ('MODERATOR', 'Content moderator with limited admin access');

-- Insert default permissions for each role
INSERT INTO permissions (role_id, resource, action) VALUES
    -- Admin permissions
    ((SELECT id FROM roles WHERE name = 'ADMIN'), 'USER', 'CREATE'),
    ((SELECT id FROM roles WHERE name = 'ADMIN'), 'USER', 'READ'),
    ((SELECT id FROM roles WHERE name = 'ADMIN'), 'USER', 'UPDATE'),
    ((SELECT id FROM roles WHERE name = 'ADMIN'), 'USER', 'DELETE'),
    ((SELECT id FROM roles WHERE name = 'ADMIN'), 'ROLE', 'CREATE'),
    ((SELECT id FROM roles WHERE name = 'ADMIN'), 'ROLE', 'READ'),
    ((SELECT id FROM roles WHERE name = 'ADMIN'), 'ROLE', 'UPDATE'),
    ((SELECT id FROM roles WHERE name = 'ADMIN'), 'ROLE', 'DELETE'),
    
    -- Customer permissions
    ((SELECT id FROM roles WHERE name = 'CUSTOMER'), 'USER', 'READ'),
    ((SELECT id FROM roles WHERE name = 'CUSTOMER'), 'USER', 'UPDATE'),
    ((SELECT id FROM roles WHERE name = 'CUSTOMER'), 'ADDRESS', 'CREATE'),
    ((SELECT id FROM roles WHERE name = 'CUSTOMER'), 'ADDRESS', 'READ'),
    ((SELECT id FROM roles WHERE name = 'CUSTOMER'), 'ADDRESS', 'UPDATE'),
    ((SELECT id FROM roles WHERE name = 'CUSTOMER'), 'ADDRESS', 'DELETE'),
    
    -- Support permissions
    ((SELECT id FROM roles WHERE name = 'SUPPORT'), 'USER', 'READ'),
    ((SELECT id FROM roles WHERE name = 'SUPPORT'), 'USER', 'UPDATE'),
    
    -- Moderator permissions
    ((SELECT id FROM roles WHERE name = 'MODERATOR'), 'USER', 'READ'),
    ((SELECT id FROM roles WHERE name = 'MODERATOR'), 'USER', 'UPDATE');