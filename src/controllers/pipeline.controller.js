
import { PipelineService } from "../services/index.js";
import { httpResponse } from "../utils/index.js";

export const PipelineController = {
    getAll: async (req, res) => {
        try {
            const data = await PipelineService.getAll(req);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    getById: async (req, res) => {
        try {
            const id = req.params.id;
            const data = await PipelineService.getById(id, req);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    create: async (req, res) => {
        try {
            const body = req.body;
            const data = await PipelineService.create(req, body);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;
            const data = await PipelineService.update(id, req);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const data = await PipelineService.delete(id, req);
            return httpResponse.SUCCESS(res, data);

        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },

};