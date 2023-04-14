export class ForbiddenException extends Error {
	constructor(message) {
		super(message);
		this.statuscode = 403;
	}
}