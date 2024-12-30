import { ROLE, roles } from "../config/roles.js";
import { httpResponse } from "../utils/httpResponse.js";

export const authorize = (requiredPermission) => {
  return (req, res, next) => {
    const userRole = req?.user?.role;
    const permissions = roles[userRole];

    if (userRole === ROLE.admin) {
      return next();
    };

    if (!permissions || !permissions?.includes(requiredPermission)) {
      return httpResponse.UNAUTHORIZED(res, {}, 'Acess denied');
    };

    next();
  };
}