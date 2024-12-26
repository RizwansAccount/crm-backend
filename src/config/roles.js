export const PERMISSION = {
    create_record: 'create_record',
    delete_record: 'delete_record',
    view_record: 'view_record',
    update_record: 'update_record'
};

export const ROLE = {
    admin: 'admin',
    manager: 'manager',
    representative: 'representative'
};

export const roles = {
    admin: ['create_record', 'delete_record', 'view_record', 'update_record'],
    representative: ['create_record', 'view_record', 'update_record'],
    manager: ['view_record'],
};