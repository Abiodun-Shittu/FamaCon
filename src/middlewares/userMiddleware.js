import { InvalidBodyParamsException } from "../exceptions/invalidBodyParamsException.js";

export const validateUserInput = (req, res, next) => {
	const { name, email, password, user_type } = req.body;

	// Check that the name is at least 3 characters long
	if (name.trim().length < 3) {
		throw new InvalidBodyParamsException(
			"Name must be at least 3 characters",
			{}
		);
	}

	// Check that the email is a valid email address
	if (!/\S+@\S+\.\S+/.test(email)) {
		throw new InvalidBodyParamsException("Invalid email address", {});
	}

	// Check that the password is at least 8 characters long and contains at least one digit
	if (!/\d/.test(password) || password.trim().length < 8) {
		throw new InvalidBodyParamsException(
			"Password must be at least 8 characters long and contain at least one digit",
			{}
		);
	}

	// Check that the user type is either "vendor" or "customer"
	if (!["vendor", "customer"].includes(user_type)) {
		throw new InvalidBodyParamsException(
			"Invalid user type. Must be either 'vendor' or 'customer'",
			{}
		);
	}

	// If all checks pass, call the next middleware
	next();
};
