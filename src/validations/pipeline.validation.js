import Joi from "joi";

export const PipelineValidation = {

    create: {
        bodySchema: Joi.object().keys({
            name: Joi.string().required(),
            stages : Joi.array().items(Joi.string())
        })
    },

    update: {
        bodySchema: Joi.object().keys({
            name: Joi.string().required()
        })
    },

};