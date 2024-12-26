import Joi from "joi";

export const UserValidation = {

    id : {
        paramsSchema : Joi.object().keys({
            id : Joi.string().required(),
        }),
    },

    email : {
        bodySchema : Joi.object().keys({
            email : Joi.string().required(),
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
            role: Joi.string().valid('admin', 'manager', 'sale-representative').required()
        })
    },

    update : {
        bodySchema : Joi.object().keys({
            name : Joi.string(),
            email : Joi.string().email(),
            password : Joi.string(),
            role: Joi.string().valid('admin', 'manager', 'sale-representative')
        })
    },

    verifyCode : {
        bodySchema : Joi.object().keys({
            email : Joi.string().required(),
            verification_code : Joi.string().required(),
        })
    },

    changePassword : {
        bodySchema : Joi.object().keys({
            email : Joi.string().required(),
            password : Joi.string().required(),
            new_password : Joi.string().required()
        })
    },

    verifyCode : {
        bodySchema : Joi.object().keys({
            email : Joi.string().required(),
            verification_code : Joi.string().required()
        })
    },

    newPassword : {
        bodySchema : Joi.object().keys({
            email : Joi.string().required(),
            password : Joi.string().required()
        })
    },

};