import { Router } from "express";
import { createUser } from "../controllers/userController.js";
import { validateRequiredParams } from "../middlewares/validateMiddleware.js";
import { validateUserInput } from "../middlewares/userMiddleware.js";

const router = Router();

router.post(
	"/register",
	validateRequiredParams(["name", "email", "password", "user_type"]),
	validateUserInput,
	createUser
);

export default router;
