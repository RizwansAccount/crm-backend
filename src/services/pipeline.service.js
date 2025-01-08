import { ROLE } from "../config/roles.js";
import { PipelineModel } from "../models/index.js";

export const PipelineService = {
    getAll: async (req) => {
        if (req?.user?.role === ROLE.representative) {
            throw new Error("You don't have permission to do this action");
        };
        return await PipelineModel.find()
            .populate('created_by', '_id name email role')
            .populate('last_updated_by', '_id name email role');
    },

    getById: async (id, req) => {
        if (req?.user?.role === ROLE.representative) {
            throw new Error("You don't have permission to do this action");
        };
        return await PipelineModel.findOne({ _id: id })
            .populate('created_by', '_id name email role')
            .populate('last_updated_by', '_id name email role');
    },

    create: async (req, body) => {
        const user_id = req?.user?.user_id;
        if (req?.user?.role === ROLE.representative) {
            throw new Error("You don't have permission to do this action");
        };
        return await PipelineModel.create({ ...body, created_by: user_id, last_updated_by: user_id });
    },

    update: async (id, req) => {
        if (req?.user?.role === ROLE.representative) {
            throw new Error("You don't have permission to do this action");
        };
        return await PipelineModel.findByIdAndUpdate(id, { ...req?.body, last_updated_by: req?.user?.user_id });
    },

    delete: async (id, req) => {
        if (req?.user?.role === ROLE.representative) {
            throw new Error("You don't have permission to do this action");
        };
        return await PipelineModel.findByIdAndDelete(id);
    }
}