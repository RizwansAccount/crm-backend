import { NoteModel } from "../models/index.js";
import { isAllowedToDeleteFileOrNote } from "../utils/queriesByRole.js";

export const NoteService = {
    getAll: async (req) => {
        const source = req?.query?.source;
        const source_id = req?.query?.source_id;

        return await NoteModel.find({ source, source_id })
            .populate('create_by', '_id name email role')
            .populate('last_update_by', '_id name email role');
    },

    getById: async (id) => {
        return await NoteModel.findOne({ _id: id })
            .populate('create_by', '_id name email role')
            .populate('last_update_by', '_id name email role');
    },

    create: async (body) => {
        return await NoteModel.create(body);
    },

    update: async (id, body) => {
        return await NoteModel.findByIdAndUpdate(id, body);
    },

    delete: async (id, req) => {
        const isAllowed = await isAllowedToDeleteFileOrNote(req, NoteModel);
        if (isAllowed) {
            return await NoteModel.findByIdAndDelete(id);
        }
    },
};