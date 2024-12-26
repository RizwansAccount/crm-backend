import { ContactModel } from "../models/index.js";

export const ContactService = {
    getAll: async () => {
        return await ContactModel.find();
    },

    getById: async (id) => {
        return await ContactModel.findOne({ _id: id });
    },

    create: async (body) => {
        return await ContactModel.create(body);
    },

    update: async (id, body) => {
        return await ContactModel.findByIdAndUpdate(id, body);
    },

    delete: async (id) => {
        return await ContactModel.findByIdAndDelete(id);
    },
};