import { NoteModel } from "../models/index.js";
import { isAllowedToAccessFilesOrNotes, isAllowedToDeleteFileOrNote } from "../utils/queriesByRole.js";

export const NoteService = {
    getAll: async (req) => {
        const source = req?.query?.source;
        const source_id = req?.query?.source_id;

        const isAllowed = await isAllowedToAccessFilesOrNotes(req);

        if (isAllowed) {
            return await NoteModel.find({ source, source_id })
                .populate('create_by', '_id name email role')
                .populate('last_update_by', '_id name email role');
        };
    },

    getById: async (id, req) => {
        const source = req?.query?.source;
        const source_id = req?.query?.source_id;

        const isAllowed = await isAllowedToAccessFilesOrNotes(req);

        if (isAllowed) {
            return await NoteModel.findOne({ _id: id, source, source_id })
                .populate('create_by', '_id name email role')
                .populate('last_update_by', '_id name email role');
        };
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