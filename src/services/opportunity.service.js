import { ROLE } from "../config/roles.js";
import { OpportunityModel} from "../models/index.js";
import { isAllowedToAccessOpporunity, isAllowedToCreateOpportunity, isAllowedToUpdateOpportunity } from "../utils/queriesByRole.js";

export const OpportunityService = {
    getAll: async (req) => {

        const isAllow = await isAllowedToAccessOpporunity(req);
        if (!isAllow) { throw new Error("You don't have permission to do this action!"); };

        return await OpportunityModel.find()
            .populate('created_by', '_id name email role')
            .populate('last_updated_by', '_id name email role');
    },

    getById: async (id, req) => {

        const isAllow = await isAllowedToAccessOpporunity(req);
        if (!isAllow) { throw new Error("You don't have permission to do this action!"); };

        return await OpportunityModel.findOne({ _id: id })
            .populate('created_by', '_id name email role')
            .populate('last_updated_by', '_id name email role');
    },

    create: async (req) => {
        const body = await isAllowedToCreateOpportunity(req);
        if (!body) { throw new Error("You don't have permission to do this action!"); };
        return await OpportunityModel.create(body);
    },

    update: async (id, req) => {
        const body = await isAllowedToUpdateOpportunity(req);
        if (!body) { throw new Error("You don't have permission to do this action!"); };
        return await OpportunityModel.findByIdAndUpdate(id, body);
    },

    delete: async (id, req) => {

        const user_id = req?.user?.user_id;
        const user_role = req?.user?.role;

        if (user_role === ROLE.representative) {
            const isAllow = await OpportunityModel.findOne({ _id: id, created_by: user_id });
            if (!isAllow) { throw new Error("You don't have permission to do this action!"); };
            return await OpportunityModel.findByIdAndDelete(id);
        };

        return await OpportunityModel.findByIdAndDelete(id);
    }
}