import Joi from "joi";

export default {

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
            upload_by: Joi.string().required(),
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
            upload_by: Joi.string().required(),
            source: Joi.string().required(),
            source_id: Joi.string().required()
        })
    }
};