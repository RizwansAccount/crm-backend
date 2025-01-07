import { AssignmentService } from "../services/index.js";
import { httpResponse } from "../utils/index.js";

export const AssignmentController = {
    getAll: async (req, res) => {
        try {
            const data = await AssignmentService.getAll(req);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    createAndUpdate: async (req, res) => {
        try {
            const body = req.body;
            const data = await AssignmentService.createAndUpdate(req, body);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    delete: async (req, res) => {
        try {
            const data = await AssignmentService.delete(req);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },

};