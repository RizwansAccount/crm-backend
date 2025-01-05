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
    getById: async (req, res) => {
        try {
            const id = req.params.id;
            const data = await AssignmentService.getById(id, req);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    create: async (req, res) => {
        try {
            const body = req.body;
            const data = await AssignmentService.create(req, body);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;
            const data = await AssignmentService.update(id, req);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const data = await AssignmentService.delete(id, req);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },

};