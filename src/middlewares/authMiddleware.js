import JWT from "jsonwebtoken";
import { UnauthorizedException } from "../exceptions/unauthorizedException.js";
import dotenv from "dotenv";
import User from "../model/userModel.js";
dotenv.config();

const secret_key = process.env.SECRET;

export const verifyToken = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith("Bearer ")) {
			throw new UnauthorizedException("Invalid authorization header");
		}

		const token = authHeader.split(" ")[1];
		const decodedToken = JWT.verify(token, secret_key);

		const user = await User.findById(decodedToken.id);

		if (!user) {
			throw new UnauthorizedException("Invalid token, not logged in");
		}

		req.user = user;
		next();
	} catch (error) {
		console.log(`Error verifying token: ${error.message}`);
		next(error);
	}
};
