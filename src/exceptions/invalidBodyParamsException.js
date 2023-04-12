export class InvalidBodyParamsException extends Error {
	constructor(message, errors) {
		super(message);
		this.statusCode = 422;
		this.errors = errors;
	}
}
