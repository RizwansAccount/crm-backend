import { NoteModel } from "../models/index.js";

export const NoteService = {
    getAll: async (req) => {
        const source = req.query.source;
        if (source) {
            return await NoteModel.find({ source })
                .populate('create_by', '_id name email role')
                .populate('last_update_by', '_id name email role');
        } else {
            return await NoteModel.find()
                .populate('create_by', '_id name email role')
                .populate('last_update_by', '_id name email role');
        }
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

    delete: async (id) => {
        return await NoteModel.findByIdAndDelete(id);
    },
};