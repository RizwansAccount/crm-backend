import Joi from "joi";

export const ContactValidation = {

    create: {
        bodySchema: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            phone: Joi.number().required(),
            address: Joi.string().required(),
            company: Joi.string().required(),
            tags: Joi.array().items(Joi.string().required()),
            assigned_to: Joi.string().required(),
        })
    },

    update: {
        bodySchema: Joi.object().keys({
            name: Joi.string(),
            email: Joi.string().email(),
            phone: Joi.number(),
            address: Joi.string(),
            company: Joi.string(),
            tags: Joi.array().items(Joi.string().required()),
            assigned_to: Joi.string(),
        })
    },

};