import { Router } from "express";
import { createUser } from "../controllers/userController.js";
import { validateUserParams } from "../middlewares/userValidation.js";

const router = Router();

router.post(
	"/register",
	validateUserParams(["name", "email", "password", "user_type"]),
	createUser
);

export default router;
