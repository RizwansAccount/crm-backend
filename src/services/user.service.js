import { UserModel } from "../models/index.js";

export const UserService = {
    getAll: async () => {
        return await UserModel.find();
    },

    getById: async (id) => {
        return await UserModel.findOne({ _id: id });
    },

    create: async (body) => {
        return await UserModel.create(body);
    },

    update: async (id, body) => {
        return await UserModel.findByIdAndUpdate(id, body);
    },

    delete: async (id) => {
        return await UserModel.findByIdAndDelete(id);
    },
};