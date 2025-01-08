import Joi from "joi";

export const PipelineValidation = {

    create: {
        bodySchema: Joi.object().keys({
            name: Joi.string().required(),
        })
    },

    update: {
        bodySchema: Joi.object().keys({
            name: Joi.string().required()
        })
    },

};