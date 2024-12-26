import { roles } from "../config/roles.js";
import { httpResponse } from "../utils/httpResponse.js";

export const authorize = (requiredPermission) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    const permissions = roles[userRole];

    if (!permissions || !permissions?.includes(requiredPermission)) {
      return httpResponse.UNAUTHORIZED(res, {}, 'Acess denied');
    }

    next();
  };
}