import { UserService } from "../services/index.js";
import { httpResponse } from "../utils/index.js";

export const UserController = {
    getAll: async (req, res) => {
        try {
            const data = await UserService.getAll();
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    getById: async (req, res) => {
        try {
            const id = req.params.id;
            const data = await UserService.getById(id);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    create: async (req, res) => {
        try {
            const body = req.body;
            const data = await UserService.create(body);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;
            const body = req.body;
            const data = await UserService.update(id, body);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const data = await UserService.delete(id);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },

};