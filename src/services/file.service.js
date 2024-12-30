import { FileModel } from "../models/index.js";

export const FileService = {
    getAll: async () => {
        return await FileModel.find();
    },

    getById: async (id) => {
        return await FileModel.findOne({ _id: id });
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