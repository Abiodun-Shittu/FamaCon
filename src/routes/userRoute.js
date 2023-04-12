import { Router } from "express";
import { createUser, loginUser } from "../controllers/userController.js";
import { validateRequiredParams } from "../middlewares/validateMiddleware.js";
import { validateUserInput } from "../middlewares/userMiddleware.js";

const router = Router();

router.post(
	"/register",
	validateRequiredParams(["name", "email", "password", "user_type"]),
	validateUserInput,
	createUser
);
router.post('/login', validateRequiredParams(["email", "password"]), loginUser);

export default router;
