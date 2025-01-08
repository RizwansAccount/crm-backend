import Joi from "joi";

export const StageValidation = {

    create: {
        bodySchema: Joi.object().keys({
            pipeline_id: Joi.string().required(),
            name: Joi.string().required(),
        })
    },

    update: {
        bodySchema: Joi.object().keys({
            pipeline_id: Joi.string().required(),
            name: Joi.string().required()
        })
    },

};