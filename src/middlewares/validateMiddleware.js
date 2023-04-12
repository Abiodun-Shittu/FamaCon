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
			return res.status(422).json({ message, errors });
		}

		next();
	};
};
