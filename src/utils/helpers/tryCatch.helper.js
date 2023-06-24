export default (fn) => {
	return (req, res, next) => {
		fn(req, res, next).catch((error) => {
			console.log("catch block");
			next(error);
		});
	};
};
