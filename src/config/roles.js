export const PERMISSION = {
    create_user: 'create_user',
    delete_user: 'delete_user',
    view_user: 'view_user',
    view_all_user: 'view_all_user',
    update_user: 'update_user',

    create_contact: 'create_contact',
    delete_contact: 'delete_contact',
    view_contact: 'view_contact',
    view_all_contact: 'view_all_contact',
    update_contact: 'update_contact',

    create_lead: 'create_lead',
    delete_lead: 'delete_lead',
    view_lead: 'view_lead',
    view_all_lead: 'view_all_lead',
    update_lead: 'update_contact',

    create_file: 'create_file',
    delete_file: 'delete_file',
    view_file: 'view_file',
    view_all_file: 'view_all_file',
    update_file: 'update_file',

};

export const ROLE = {
    admin: 'admin',
    manager: 'manager',
    representative: 'representative'
};

export const SOURCE = {
    contact: 'Contact',
    lead: 'Lead',
    activity: 'Activity'
};

export const LEAD_STATUS = {
    new: 'new',
    contacted: 'contacted',
    qualified: 'qualified',
    lost: 'lost'
};

export const roles = {
    [ROLE.admin]: [
        PERMISSION.create_user, PERMISSION.view_all_user, PERMISSION.view_user, PERMISSION.update_user, PERMISSION.delete_user,
        PERMISSION.create_contact, PERMISSION.view_all_contact, PERMISSION.view_contact, PERMISSION.update_contact, PERMISSION.delete_contact,
        PERMISSION.create_lead, PERMISSION.view_all_lead, PERMISSION.view_lead, PERMISSION.update_lead, PERMISSION.delete_lead,
        PERMISSION.create_file, PERMISSION.view_all_file, PERMISSION.view_file, PERMISSION.update_file, PERMISSION.delete_file,
    ],

    [ROLE.manager]: [
        PERMISSION.create_user, PERMISSION.view_all_user, PERMISSION.view_user, PERMISSION.update_user, PERMISSION.delete_user,
        PERMISSION.create_contact, PERMISSION.view_all_contact, PERMISSION.view_contact, PERMISSION.update_contact, PERMISSION.delete_contact,
        PERMISSION.create_lead, PERMISSION.view_all_lead, PERMISSION.view_lead, PERMISSION.update_lead, PERMISSION.delete_lead,
        PERMISSION.create_file, PERMISSION.view_all_file, PERMISSION.view_file, PERMISSION.update_file, PERMISSION.delete_file,
    ],

    [ROLE.representative]: [
        PERMISSION.view_user,
        PERMISSION.create_contact, PERMISSION.view_all_contact, PERMISSION.view_contact, PERMISSION.update_contact, PERMISSION.delete_contact,
        PERMISSION.create_lead, PERMISSION.view_all_lead, PERMISSION.view_lead, PERMISSION.update_lead, PERMISSION.delete_lead,
        PERMISSION.create_file, PERMISSION.view_all_file, PERMISSION.view_file, PERMISSION.update_file, PERMISSION.delete_file,
    ],

};