import { httpResponse } from "../utils/index.js";

export const validate = (schema, source = 'body') => {
    return (req, res, next) => {
        const { error } = schema.validate(req[source], { abortEarly: false });
        
        if (error) {
            const errorMessage = error.details?.map((detail) => detail.message.replace(/\"/g, ""))?.join(", ");
            return httpResponse.BAD_REQUEST(res, {}, errorMessage);
        }
        
        next();
    };
};