import { NoteModel } from "../models/index.js";

export const NoteService = {
    getAll: async () => {
        return await NoteModel.find();
    },

    getById: async (id) => {
        return await NoteModel.findOne({ _id: id });
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