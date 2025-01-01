import Joi from "joi";

export const NoteValidation = {

    get: {
        querySchema: Joi.object().keys({
            source: Joi.string().required(),
            source_id: Joi.string().required(),
        })
    },

    create: {
        bodySchema: Joi.object().keys({
            note: Joi.string().required(),
            source: Joi.string().required(),
            source_id: Joi.string().required()
        })
    },

    update: {
        bodySchema: Joi.object().keys({
            note: Joi.string().required(),
            source: Joi.string().required(),
            source_id: Joi.string().required()
        })
    },

};