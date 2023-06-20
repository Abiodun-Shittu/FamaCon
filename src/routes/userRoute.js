import { Router } from "express";
import {
	changePassword,
	createUser,
	deleteUser,
	getUser,
	loginUser,
	updateUser,
} from "../controllers/userController.js";
import { validateRequiredParams } from "../middlewares/validateMiddleware.js";
import { validateUserInput } from "../middlewares/userMiddleware.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.post(
	"/register",
	validateRequiredParams(["name", "email", "password", "user_type"]),
	validateUserInput,
	createUser
);
router.post("/login", validateRequiredParams(["email", "password"]), loginUser);
router.get("/:userId", verifyToken, getUser);
router.put("/:userId", verifyToken, updateUser);
router.put("/:userId", verifyToken, changePassword);
router.delete("/:userId", verifyToken, deleteUser);

export default router;
