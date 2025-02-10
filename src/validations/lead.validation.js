import Joi from "joi";
import { LEAD_STATUS } from "../config/roles.js";

export const LeadValidation = {

    create: {
        bodySchema: Joi.object().keys({
            name: Joi.string().required(),
            contact: Joi.number().required(),
            lead_source: Joi.string().required(),
            status: Joi.string().valid(LEAD_STATUS.new, LEAD_STATUS.contacted, LEAD_STATUS.qualified, LEAD_STATUS.lost).required(),
            assigned_to: Joi.array().items(Joi.string())
        })
    },
    update: {
        bodySchema: Joi.object().keys({
            name: Joi.string(),
            contact: Joi.number(),
            lead_source: Joi.string(),
            status: Joi.string().valid(LEAD_STATUS.new, LEAD_STATUS.contacted, LEAD_STATUS.qualified, LEAD_STATUS.lost),
            assigned_to: Joi.array().items(Joi.string())
        })
    },

};