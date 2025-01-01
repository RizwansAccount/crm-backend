
import { NoteService } from "../services/index.js";
import { httpResponse } from "../utils/index.js";
import { isAllowedToAttachFileOrNote } from "../utils/queriesByRole.js";

export const NoteController = {
    getAll: async (req, res) => {
        try {
            const data = await NoteService.getAll(req);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    getById: async (req, res) => {
        try {
            const id = req.params.id;
            const data = await NoteService.getById(id, req);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    create: async (req, res) => {
        try {
            const body = req.body;
            const user_id = req.user.user_id;
            const isAllowed = await isAllowedToAttachFileOrNote(req);
            if (isAllowed) {
                const data = await NoteService.create({ ...body, create_by: user_id, last_update_by: user_id });
                return httpResponse.SUCCESS(res, data);
            }
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;
            const body = req.body;
            const isAllowed = await isAllowedToAttachFileOrNote(req);
            if (isAllowed) {
                const data = await NoteService.update(id, { ...body, last_update_by: req.user.user_id });
                return httpResponse.SUCCESS(res, data);
            }
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const data = await NoteService.delete(id, req);
            return httpResponse.SUCCESS(res, data);

        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, {}, (error.message || error));
        }
    },

};