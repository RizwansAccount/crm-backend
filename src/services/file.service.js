import { FileModel } from "../models/index.js";
import { isAllowedToDeleteFileOrNote, isAllowedToAccessFilesOrNotes } from "../utils/queriesByRole.js";

export const FileService = {
    getAll: async (req) => {
        const source = req?.query?.source;
        const source_id = req?.query?.source_id;

        const isAllowed = await isAllowedToAccessFilesOrNotes(req);

        if (isAllowed) {
            return await FileModel.find({ source, source_id })
                .populate('create_by', '_id name email role')
                .populate('last_update_by', '_id name email role');
        };
    },

    getById: async (id, req) => {
        const source = req?.query?.source;
        const source_id = req?.query?.source_id;

        const isAllowed = await isAllowedToAccessFilesOrNotes(req);

        if (isAllowed) {
            return await FileModel.findOne({ _id : id, source, source_id })
                .populate('create_by', '_id name email role')
                .populate('last_update_by', '_id name email role');
        };
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