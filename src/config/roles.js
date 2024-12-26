export const PERMISSION = {
    create_user: 'create_user',
    delete_user: 'delete_user',
    view_user: 'view_user',
    view_all_user : 'view_all_user',
    update_user: 'update_user'
};

export const ROLE = {
    admin: 'admin',
    manager: 'manager',
    representative: 'representative'
};

export const roles = {
    admin: ['create_user', 'delete_user', 'view_user', 'update_user', 'view_all_user'],
    representative: ['view_user'],
    manager: ['view_user'],
};