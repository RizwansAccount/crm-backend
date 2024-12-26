import Joi from "joi";
import { ROLE } from "../config/roles.js";

export const UserValidation = {

    id : {
        paramsSchema : Joi.object().keys({
            id : Joi.string().required(),
        }),
    },

    login : {
        bodySchema : Joi.object().keys({
            email : Joi.string().required(),
            password : Joi.string().required(),
        })
    },

    create : {
        bodySchema : Joi.object().keys({
            name : Joi.string().required(),
            email : Joi.string().required().email(),
            password : Joi.string().required(),
            role: Joi.string().valid(ROLE.admin, ROLE.manager, ROLE.representative).required()
        })
    },

    update : {
        bodySchema : Joi.object().keys({
            name : Joi.string(),
            email : Joi.string().email(),
            password : Joi.string(),
            role: Joi.string().valid(ROLE.admin, ROLE.manager, ROLE.representative)
        })
    },

};