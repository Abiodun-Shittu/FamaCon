import { InvalidBodyParamsException } from "../exceptions/invalidBodyParamsException.js";

export const validateRequiredParams = (requiredParams = []) => {
	return (req, res, next) => {
		let message = "";
		let errors = {};

		requiredParams.forEach((param) => {
			if (!req.body[param].trim()) {
				message = "Unprocessable Entity";
				errors[param] = `${param} is required`;
			}
		});
		if (Object.keys(errors).length > 0) {
			throw new InvalidBodyParamsException(message, errors);
		}

		next();
	};
};
