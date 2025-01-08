import { ROLE } from "../config/roles.js";
import { StageModel } from "../models/index.js";

export const StageService = {
    getAll: async (req) => {
        const pipeline_id = req?.query?.pipeline_id;
        const query = pipeline_id ? { pipeline_id } : {};
        return await StageModel.find(query)
            .populate('created_by', '_id name email role')
            .populate('last_updated_by', '_id name email role');
    },

    getById: async (id) => {
        return await StageModel.findOne({ _id: id })
            .populate('created_by', '_id name email role')
            .populate('last_updated_by', '_id name email role');
    },

    create: async (req, body) => {
        const user_id = req?.user?.user_id;
        if (req?.user?.role === ROLE.representative) {
            throw new Error("You don't have permission to do this action");
        };
        return await StageModel.create({ ...body, created_by: user_id, last_updated_by: user_id });
    },

    update: async (id, req) => {
        if (req?.user?.role === ROLE.representative) {
            throw new Error("You don't have permission to do this action");
        };
        const { pipeline_id, ...body } = req?.body;
        return await StageModel.findOneAndUpdate({ _id : id, pipeline_id : req?.body?.pipeline_id }, { ...body, last_updated_by: req?.user?.user_id });
    },

    delete: async (id, req) => {
        if (req?.user?.role === ROLE.representative) {
            throw new Error("You don't have permission to do this action");
        };
        return await StageModel.findByIdAndDelete(id);
    }
}