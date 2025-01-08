import Joi from "joi";
import { SOURCE } from "../config/roles.js";

export const AssignmentValidation = {

    get : {
        querySchema: Joi.object().keys({
            source: Joi.string().valid(SOURCE.contact, SOURCE.lead, SOURCE.activity).required(),
            source_id: Joi.string().required()
        })
    },

    delete : {
        bodySchema: Joi.object().keys({
            source: Joi.string().valid(SOURCE.contact, SOURCE.lead, SOURCE.activity).required(),
            source_id: Joi.string().required(),
            user_id: Joi.string().required(),
        })
    },

    create: {
        bodySchema: Joi.object().keys({
            source: Joi.string().required(),
            source_id: Joi.string().required(),
            assigned_to: Joi.array().items(Joi.string().required()).required()
        })
    },

    update: {
        bodySchema: Joi.object().keys({
            source: Joi.string().required(),
            source_id: Joi.string().required(),
            assigned_to: Joi.array().items(Joi.string())
        })
    },

};