import Joi from "joi";
import { SOURCE } from "../config/roles.js";

export const OpportunityValidation = {

    create: {
        bodySchema: Joi.object().keys({
            pipeline_id: Joi.string().required(),
            source: Joi.string().valid(SOURCE.contact, SOURCE.lead, SOURCE.activity).required(),
            source_id: Joi.string().required(),
            expected_revenue: Joi.number().required(),
            close_date: Joi.date().required(),
            stage_id : Joi.string()
        })
    },

    update: {
        bodySchema: Joi.object().keys({
            pipeline_id: Joi.string(),
            source: Joi.string().valid(SOURCE.contact, SOURCE.lead, SOURCE.activity),
            source_id: Joi.string(),
            expected_revenue: Joi.number(),
            close_date: Joi.date(),
            stage_id : Joi.string()
        })
    },

};