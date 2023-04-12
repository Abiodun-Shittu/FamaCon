import { ConflictException } from "../exceptions/conflictException.js";
import { InvalidBodyParamsException } from "../exceptions/invalidBodyParamsException.js";

export const errorHandler = (err, req, res, next) => {
	let statusCode;
	let message;
	let errors = {};

	if (err instanceof InvalidBodyParamsException) {
		statusCode = err.statusCode;
		message = err.message;
		errors = err.errors;
	} else if (err instanceof ConflictException) {
		statusCode = err.statusCode;
		message = err.message;
	} else {
		statusCode = 500;
		message = "Server Error, please contact the administrator";
	}

	if (Object.keys(errors).length > 0) {
		return res.status(statusCode).json({ statusCode, message, errors });
	} else {
		return res.status(statusCode).json({ statusCode, message });
	}
};
