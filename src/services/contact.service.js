import { ContactModel } from "../models/index.js";
import { createQueryByRole, deleteQueryByRole, getAllQueryByRole, getByIdQueryByRole, updateQueryByRole } from "../utils/queriesByRole.js";

export const ContactService = {
    getAll: async (req) => {
        const data = await getAllQueryByRole(req, ContactModel);
        return data;
    },

    getById: async (id, req) => {
        const data = await getByIdQueryByRole(id, req, ContactModel);
        return data;
    },

    create: async (req, body) => {
        req.source = "Contact";
        const data = await createQueryByRole(req, body, ContactModel);
        return data;
    },

    update: async (id, req) => {
        req.source = "Contact";
        const data = await updateQueryByRole(id, req, ContactModel);
        return data;
    },

    delete: async (id, req) => {
        const data = await deleteQueryByRole(id, req, ContactModel);
        return data;
    },
};