import { FileModel } from "../models/index.js";
import { isAllowedToDeleteFileOrNote } from "../utils/queriesByRole.js";

export const FileService = {
    getAll: async (req) => {
        const source = req.query.source;
        const query = source ? { source } : {};

        return await FileModel.find(query)
        .populate('create_by', '_id name email role')
        .populate('last_update_by', '_id name email role');
    },

    getById: async (id) => {
        return await FileModel.findOne({ _id: id })
            .populate('create_by', '_id name email role')
            .populate('last_update_by', '_id name email role');
    },

    createMany: async (body) => {
        return await FileModel.insertMany(body);
    },

    update: async (id, body) => {
        return await FileModel.findByIdAndUpdate(id, body);
    },

    delete: async (id, req) => {
        const isAllowed = await isAllowedToDeleteFileOrNote(req, FileModel);
        if (isAllowed) {
            return await FileModel.findByIdAndDelete(id);
        }
    },
};