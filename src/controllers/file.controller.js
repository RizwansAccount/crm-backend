import { FileService } from "../services/index.js";
import { httpResponse } from "../utils/index.js";

export const FileController = {
    getAll: async (req, res) => {
        try {
            const data = await FileService.getAll();
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    getById: async (req, res) => {
        try {
            const id = req.params.id;
            const data = await FileService.getById(id);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    createMany: async (req, res) => {
        try {
            const files = req?.files;
            if (!files || files?.length === 0) { throw new Error("Files do not exist."); };

            const fileDetails = files?.map((file) => ({
                link: `${req.protocol}://${req.get("host")}/${file.path}`,
                original_name: file?.originalname,
                current_name: file?.filename,
                type: file?.mimetype,
                path: file?.path,
                size: file?.size,
                ...req.body
            }));

            const data = await FileService.createMany(fileDetails);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    update: async (req, res) => {
        try {
            const id = req?.params?.id;
            const file = req?.file;

            if (!file) { throw new Error("File does not exist."); };

            const body = {
                link: `${req.protocol}://${req.get("host")}/${file.path}`,
                original_name: file?.originalname,
                current_name: file?.filename,
                type: file?.mimetype,
                path: file?.path,
                size: file?.size,
                ...req.body
            };

            const data = await FileService.update(id, body);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const data = await FileService.delete(id);
            return httpResponse.SUCCESS(res, data);
        } catch (error) {
            return httpResponse.INTERNAL_SERVER_ERROR(res, error);
        }
    },

};