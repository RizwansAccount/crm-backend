import { AssignmentModel } from "../models/index.js";


export const AssignmentService = {
    getAll: async () => {
        return await AssignmentModel.find();
    },

    getById: async (id) => {
        return await AssignmentModel.findOne({ _id: id });
    },

    create: async (req, body) => {
        return await AssignmentModel.create(body);
    },

    update: async (id, body) => {
        return await AssignmentModel.findByIdAndUpdate(id, body);
    },

    delete: async (id) => {
        return await AssignmentModel.findByIdAndDelete(id);
    }
}