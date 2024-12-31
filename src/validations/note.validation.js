import Joi from "joi";

export const NoteValidation = {

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