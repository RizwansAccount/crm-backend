import jwt from "jsonwebtoken";
import config from "../config/index.js";
import { httpResponse } from "../utils/index.js";

export const authenticate = (req, res, next) => {
	const token = req.header("authorization");
	if (!token)
		return httpResponse.BAD_REQUEST(
			res,
			"Need token (JWT) to hit this API",
			"Access denied. No token provided."
		);

	const bearerToken = token.split(" ")[1];

	try {
		const payload = jwt.verify(bearerToken, config.env.jwtSecret);
		req.user = payload;
		next();
	} catch (error) {
		httpResponse.UNAUTHORIZED(res, "Token is not valid", "Invalid token.");
	}
};