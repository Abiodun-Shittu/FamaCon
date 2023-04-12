import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import JWT from "jsonwebtoken";
import { ConflictException } from "../exceptions/conflictException.js";
import { NotFoundException } from "../exceptions/notFoundException.js";
import { UnauthorizedException } from "../exceptions/unauthorizedException.js";
dotenv.config();

const salt = Number(process.env.HASH_SALT);
const secret_key = process.env.SECRET;

// Create a new User
export const createUser = async (req, res, next) => {
	try {
		const { name, email, password, profile_picture, user_type } = req.body;
		const checkEmailExists = await User.findOne({ email });
		if (checkEmailExists) {
			throw new ConflictException("Email already exists");
		}
		// hash the password
		const passwordHash = await bcrypt.hash(password, salt);
		const newUser = await User.create({
			name,
			email,
			password: passwordHash,
			profile_picture,
			user_type,
		});
		const token = JWT.sign(
			{ id: newUser._id, name: newUser.name, email: newUser.email },
			secret_key
		);
		return res.status(201).json({
			message: "User created successfully",
			data: newUser,
			token,
		});
	} catch (error) {
		console.log(`Error creating user: ${error.message}`);
		next(error);
	}
};

// Login the user
export const loginUser = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			throw new NotFoundException("User does not exist");
		}
		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch) {
			throw new UnauthorizedException("Invalid email or password");
		}
		const token = JWT.sign(
			{ id: user._id, name: user.name, email: user.email },
			secret_key
		);
		return res.status(200).json({
			message: "User logged in successfully",
			data: user,
			token,
		});
	} catch (error) {
		console.log(`Error logging in User: ${error.message}`);
		next(error);
	}
};
