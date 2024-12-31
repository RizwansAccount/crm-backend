import { FileModel } from "../models/index.js";

export const FileService = {
    getAll: async (req) => {
        const source = req.query.source;
        if (source) {
            return await FileModel.find({ source })
                .populate('create_by', '_id name email role')
                .populate('last_update_by', '_id name email role');
        } else {
            return await FileModel.find()
                .populate('create_by', '_id name email role')
                .populate('last_update_by', '_id name email role');
        }
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

    delete: async (id) => {
        return await FileModel.findByIdAndDelete(id);
    },
};