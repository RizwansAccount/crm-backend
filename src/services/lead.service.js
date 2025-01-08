import { SOURCE } from "../config/roles.js";
import { LeadModel } from "../models/index.js";
import { createQueryByRole, deleteQueryByRole, getAllQueryByRole, getByIdQueryByRole, updateQueryByRole } from "../utils/queriesByRole.js";

export const LeadService = {
    getAll: async (req) => {
        const data = await getAllQueryByRole(req, LeadModel);
        return data;
    },

    getById: async (id, req) => {
        const data = await getByIdQueryByRole(id, req, LeadModel);
        return data;
    },

    create: async (req, body) => {
        req.source = SOURCE.lead;
        const data = await createQueryByRole(req, body, LeadModel);
        return data;
    },

    update: async (id, req) => {
        req.source = SOURCE.lead;
        const data = await updateQueryByRole(id, req, LeadModel);
        return data;
    },

    delete: async (id, req) => {
        const data = await deleteQueryByRole(id, req, LeadModel);
        return data;
    },
};