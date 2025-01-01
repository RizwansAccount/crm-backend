import Joi from "joi";

export const FileValidation = {

    get : {
        querySchema : Joi.object().keys({
            source : Joi.string().required(),
            source_id : Joi.string().required(),
        })
    },

    create: {
        bodySchema: Joi.object().keys({
            files: Joi.array().items(
                Joi.object().keys({
                    original_name: Joi.string().required(),
                    current_name: Joi.string().required(),
                    type: Joi.string().required(),
                    path: Joi.string().uri().required(),
                    size: Joi.number().required(),
                })
            ),
            create_by: Joi.string(),
            last_update_by: Joi.string(),
            source: Joi.string().required(),
            source_id: Joi.string().required(),
        })
    },

    update: {
        bodySchema: Joi.object().keys({
            file: Joi.object().keys({
                original_name: Joi.string().required(),
                current_name: Joi.string().required(),
                type: Joi.string().required(),
                path: Joi.string().required(),
                size: Joi.string().required(),
            }),
            create_by: Joi.string(),
            last_update_by: Joi.string(),
            source: Joi.string().required(),
            source_id: Joi.string().required()
        })
    }
};